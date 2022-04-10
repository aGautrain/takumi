import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CoinGeckoAPIService,
  CryptocurrencyChartData,
} from '../services/coingecko-api.service';
import {
  CoinmarketApiService,
  CryptocurrencyInfo,
} from '../services/coinmarket-api.service';
import { SupportedSymbol } from '../services/wallet.service';

/*
    Composant qui correspond à la page /asset, prend en paramètre une crypto, par exemple /asset/eth

    et affiche un titre, un graphique, une description, et le prix de celle-ci
 */

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
})
export class AssetComponent implements OnInit {
  // on utilise des symboles dans l'application
  symbol: SupportedSymbol = SupportedSymbol.Ethereum;
  assetInfos: CryptocurrencyInfo | undefined = undefined;

  chartData: CryptocurrencyChartData | undefined = undefined;

  chartReadyForDisplay: boolean = false;
  chartLabels: string[] = [];
  chartPoints: number[] = [];
  chartTitle: string = '';

  chartFocus: [string, number] | undefined;

  constructor(
    private route: ActivatedRoute,
    private coinmarketApi: CoinmarketApiService,
    private coingeckoApi: CoinGeckoAPIService
  ) {}

  ngOnInit(): void {
    // à chaque fois qu'on change de crypto, par exemple /asset/eth, /asset/avax, etc.
    this.route.params.subscribe(async (params: any) => {
      // on cache le graphique en attendant d'avoir les infos
      this.chartReadyForDisplay = false;
      this.symbol = params['symbol']?.toLowerCase();

      await this.refreshAssetInfo();

      // on les attribue au graphique
      this.chartData = await this.coingeckoApi.getCryptocurrencyChart(
        this.symbol
      );
      this.chartTitle = `${this.symbol} (€)`;

      this.chartLabels = this.chartData.prices.map(([date, _]) =>
        new Date(date).toLocaleDateString('fr')
      );
      this.chartPoints = this.chartData.prices.map(([_, price]) => price);
      this.resetChartFocus();

      // on indique que le graphique est prêt à être affiché
      this.chartReadyForDisplay = !!(
        this.chartLabels?.length && this.chartPoints?.length
      );
    });
  }

  async refreshAssetInfo() {
    const assets = await this.coinmarketApi.getCryptosInfos();

    // on récupère les infos qui correspondent au symbole demandé
    const asset = Object.values(assets).find((asset: CryptocurrencyInfo) => {
      return this.symbol?.toLowerCase() === asset?.symbol?.toLowerCase();
    });

    this.assetInfos = asset;
  }

  resetChartFocus() {
    if (this.chartLabels?.length && this.chartPoints?.length) {
      // affichage du dernier prix (correspond au dernier point du graphique)
      this.chartFocus = [
        this.chartLabels[this.chartLabels.length - 1],
        this.chartPoints[this.chartPoints.length - 1],
      ];
    }
  }

  onChartFocus(change: [string, number]) {
    // quand on survole le graphique, on met à jour le prix affiché pour le PriceCardComponent
    this.chartFocus = change;
  }
}
