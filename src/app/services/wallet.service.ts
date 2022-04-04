import { Injectable } from '@angular/core';
import {EtherscanApiService} from "./explorers/etherscan-api.service";
import {CoinmarketApiService} from "./coinmarket-api.service";
import {SymbolToIdService} from "./symbol-to-id.service";
import {Observable, Subject} from "rxjs";
import {NftsApiService, OwnedNFT} from "./explorers/nfts-api.service";
import {nftsMocked} from "./cryptocurrencies.mock";

export enum SupportedSymbol {
  Avalanche = 'AVAX',
  Ethereum = 'ETH',
  Binance = 'BNB',
  Fantom = 'FTM',
  Polygon = 'MATIC'
}

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

  origin?: Blockchain;
}

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private address: string = '';



  assets: Record<string, Partial<Asset>> = {};
  nfts: OwnedNFT[] = nftsMocked.ownedNfts;

  private onRefresh$$: Subject<void> = new Subject<void>();
  onRefresh$: Observable<void> = this.onRefresh$$.asObservable();

  get walletValue(): number {
    return this.assets ? Object.values(this.assets).reduce((totalValue, asset) => {
      return asset?.value ? totalValue + asset.value : totalValue;
    }, 0) : 0;
  }

  constructor(private coinmarketApi: CoinmarketApiService,
              private etherscanApi: EtherscanApiService,
              private nftsApi: NftsApiService) { }

  private convertWeiToEth(wei: number): number {
    return wei / 1000000000000000000;
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
        quantity: this.convertWeiToEth(wei)
      };


      await this.loadAssetsInfos();
    }
  }

  async loadAssetsInfos() {
    if (!this.assets) return;

    const infos = await this.coinmarketApi.getCryptosInfos(Object.keys(this.assets));
    console.info(infos);

    // populating assets infos from coinmarket result
    Object.entries(infos).forEach(([symbol, cryptoInfos]) => {
      if (symbol && this.assets[symbol] !== undefined) {
        this.assets[symbol] = {
          ...this.assets[symbol],
          logo: cryptoInfos.logo,
          name: cryptoInfos.name,
          symbol
        };
      }
    });

    const market = await this.coinmarketApi.getCryptosLatestMarketData();
    Object.entries(market).forEach(([symbol, cryptoMarketInfos]) => {
      if (symbol && this.assets[symbol] !== undefined) {

        const quantity = this.assets[symbol].quantity || 0;

        this.assets[symbol] = {
          ...this.assets[symbol],
          price: cryptoMarketInfos.price,
          value: quantity * cryptoMarketInfos.price,
          percent_change_24h: cryptoMarketInfos.percent_change_24h
        };

        this.assets[symbol].value_change_24h = ((this.assets[symbol].value || 0) * cryptoMarketInfos.percent_change_24h) / 100
      }
    });

    console.info(this.assets);

    this.onRefresh$$.next();

  }

  async loadNFTS() {

    if (!this.address) return;

    const collection = await this.nftsApi.getNFTS(this.address);
    console.info(collection);
    if (collection?.ownedNfts) this.nfts = collection.ownedNfts;
  }
}
