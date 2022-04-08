import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinGeckoAPIService, CryptocurrencyChartData } from '../services/coingecko-api.service';
import { CoinmarketApiService, CryptocurrencyInfo } from '../services/coinmarket-api.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {

  // symbol used everywhere, inside API service symbol is translated into a platform-specific id
  symbol: string = '';
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
    private coingeckoApi: CoinGeckoAPIService) { }

  ngOnInit(): void {

    this.route.params.subscribe(async (params: any) => {
      this.chartReadyForDisplay = false;
      this.symbol = params['symbol']?.toLowerCase();

      await this.refreshAssetInfo();

      this.chartData = await this.coingeckoApi.getCryptocurrencyChart(this.symbol);
      this.chartTitle = `${this.symbol} (€)`;

      this.chartLabels = this.chartData.prices.map(([date, _]) => new Date(date).toLocaleDateString('fr'));
      this.chartPoints = this.chartData.prices.map(([_, price]) => price);
      this.resetChartFocus();
      this.chartReadyForDisplay = !!(this.chartLabels?.length && this.chartPoints?.length);
    });
  }

  async refreshAssetInfo() {
    const assets = await this.coinmarketApi.getCryptosInfos();

    const asset = Object.values(assets).find((asset: CryptocurrencyInfo) => {
      return this.symbol?.toLowerCase() === asset?.symbol?.toLowerCase();
    });

    this.assetInfos = asset;
  }

  resetChartFocus() {
    if (this.chartLabels?.length && this.chartPoints?.length) {
      this.chartFocus = [this.chartLabels[this.chartLabels.length - 1], this.chartPoints[this.chartPoints.length - 1]];
    }
  }

  onChartFocus(change: [string, number]) {
    this.chartFocus = change;
  }

}
