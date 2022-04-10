import { Injectable } from '@angular/core';
import { EtherscanApiService } from './explorers/etherscan-api.service';
import { CoinmarketApiService } from './coinmarket-api.service';
import { Observable, Subject } from 'rxjs';
import { NftsApiService, OwnedNFT } from './explorers/nfts-api.service';
import { AvaxApiService } from './explorers/avax-api.service';
import { FantomApiService } from './explorers/fantom-api.service';
import { BinanceApiService } from './explorers/binance-api.service';
import { PolygonApiService } from './explorers/polygon-api.service';

export enum SupportedSymbol {
  Avalanche = 'AVAX',
  Ethereum = 'ETH',
  Binance = 'BNB',
  Fantom = 'FTM',
  Polygon = 'MATIC',
}

export const ALL_SUPPORTED_SYMBOLS: SupportedSymbol[] = [
  SupportedSymbol.Avalanche,
  SupportedSymbol.Binance,
  SupportedSymbol.Ethereum,
  SupportedSymbol.Fantom,
  SupportedSymbol.Polygon,
];

export interface Blockchain {
  name: string;
}

export interface Asset {
  symbol: string;
  logo: string;
  name: string;
  price: number;
  quantity: number;
  value: number;
  percent_change_24h: number;
  value_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_90d: number;

  origin?: Blockchain;
}

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private address: string = '';

  assets: Record<string, Partial<Asset>> = {};
  nfts: OwnedNFT[] = [];

  private onRefresh$$: Subject<void> = new Subject<void>();
  onRefresh$: Observable<void> = this.onRefresh$$.asObservable();

  get walletValue(): number {
    return this.assets
      ? Object.values(this.assets).reduce((totalValue, asset) => {
          return asset?.value ? totalValue + asset.value : totalValue;
        }, 0)
      : 0;
  }

  constructor(
    private coinmarketApi: CoinmarketApiService,
    private etherscanApi: EtherscanApiService,
    private avaxApi: AvaxApiService,
    private nftsApi: NftsApiService,
    private fantomApi: FantomApiService,
    private BscscanApi: BinanceApiService,
    private PolygonApi: PolygonApiService
  ) {}

  private convertWUnitToUnit(w: number): number {
    return w / 1000000000000000000;
  }

  getAddress(): string {
    return this.address;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  async loadAssets() {
    // load assets based on address and given explorer API
    if (this.address) {
      const wei = await this.etherscanApi.getBalance(this.address);
      this.assets[SupportedSymbol.Ethereum] = {
        quantity: this.convertWUnitToUnit(wei),
      };

      const wavax = await this.avaxApi.getBalance(this.address);
      this.assets[SupportedSymbol.Avalanche] = {
        quantity: this.convertWUnitToUnit(wavax),
      };

      const wftm = await this.fantomApi.getBalance(this.address);
      this.assets[SupportedSymbol.Fantom] = {
        quantity: this.convertWUnitToUnit(wftm),
      };

      const wbnb = await this.BscscanApi.getBalance(this.address);
      this.assets[SupportedSymbol.Binance] = {
        quantity: this.convertWUnitToUnit(wbnb),
      };

      const wmatic = await this.PolygonApi.getBalance(this.address);
      this.assets[SupportedSymbol.Polygon] = {
        quantity: this.convertWUnitToUnit(wmatic),
      };

      await this.loadAssetsInfos();
    }
  }

  async loadAssetsInfos() {
    if (!this.assets) return;

    const infos = await this.coinmarketApi.getCryptosInfos(
      Object.keys(this.assets) as SupportedSymbol[]
    );

    // on utilise les infos retournées par CoinMarket (logo, nom, etc.)
    Object.entries(infos).forEach(([symbol, cryptoInfos]) => {
      if (symbol && this.assets[symbol] !== undefined) {
        this.assets[symbol] = {
          ...this.assets[symbol],
          logo: cryptoInfos.logo,
          name: cryptoInfos.name,
          symbol,
        };
      }
    });

    // et une route pour récupérer via CoinMarket les évolutions des cryptos
    const market = await this.coinmarketApi.getCryptosLatestMarketData();
    Object.entries(market).forEach(([symbol, cryptoMarketInfos]) => {
      if (symbol && this.assets[symbol] !== undefined) {
        const quantity = this.assets[symbol].quantity || 0;

        this.assets[symbol] = {
          ...this.assets[symbol],
          price: cryptoMarketInfos.price,
          value: quantity * cryptoMarketInfos.price,
          percent_change_24h: cryptoMarketInfos.percent_change_24h,
          percent_change_7d: cryptoMarketInfos.percent_change_7d,
          percent_change_30d: cryptoMarketInfos.percent_change_30d,
          percent_change_90d: cryptoMarketInfos.percent_change_90d,
        };

        this.assets[symbol].value_change_24h =
          ((this.assets[symbol].value || 0) *
            cryptoMarketInfos.percent_change_24h) /
          100;
      }
    });

    this.onRefresh$$.next();
  }

  async loadNFTS() {
    if (!this.address) return;

    const collection = await this.nftsApi.getNFTS(this.address);
    if (collection?.ownedNfts) this.nfts = collection.ownedNfts;
    else this.nfts = [];
  }
}
