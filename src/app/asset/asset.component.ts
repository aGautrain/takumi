import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinmarketApiService, CryptocurrencyInfo } from '../services/coinmarket-api.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {

  assetId: string = '';
  assetInfos: CryptocurrencyInfo | undefined = undefined;

  constructor(private route: ActivatedRoute, private coinmarketApi: CoinmarketApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(async (params: any) => {
      console.info(params['id']);
      this.assetId = params['id'];
      // await this.refreshAssetInfo();
    });
  }

  async refreshAssetInfo() {
    console.info('loading asset infos');
    this.assetInfos = await this.coinmarketApi.getCryptocurrencyInfo(this.assetId);
    console.info(this.assetInfos)
  }

}
