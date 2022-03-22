import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CoinGeckoAPIService, CryptocurrencyChartData } from '../services/coingecko-api.service';
import { CoinmarketApiService, CryptocurrencyInfo } from '../services/coinmarket-api.service';
import { FiatUnitService } from '../services/fiat-unit.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {

  // symbol used everywhere, inside API service symbol is translated into a platform-specific id
  symbol: string = '';
  coinGeckoAssetId: string = '';
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
    private coingeckoApi: CoinGeckoAPIService,
    private fiatUnitService: FiatUnitService) { }

  ngOnInit(): void {

    this.route.params.subscribe(async (params: any) => {
      this.chartReadyForDisplay = false;
      this.symbol = params['symbol'];


      await this.refreshAssetInfo();

      this.chartData = await this.coingeckoApi.getCryptocurrencyChart(this.symbol);
      this.chartTitle = `${this.symbol} (${this.fiatUnitService.getSymbol()})`;

      this.chartLabels = this.chartData.prices.map(([date, _]) => new Date(date).toDateString());
      this.chartPoints = this.chartData.prices.map(([_, price]) => price);
      this.chartReadyForDisplay = !!(this.chartLabels?.length && this.chartPoints?.length);
    });
  }

  async refreshAssetInfo() {
    const assets = await this.coinmarketApi.getBlockchainsInfos();

    const asset = Object.values(assets).find((asset: CryptocurrencyInfo) => {
      return this.symbol?.toLowerCase() === asset?.symbol?.toLowerCase();
    });

    this.assetInfos = asset;
  }

  onChartFocus(change: [string, number]) {
    this.chartFocus = change;
  }

}
