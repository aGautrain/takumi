import { Component, OnInit } from '@angular/core';
import {Asset, WalletService} from "../../services/wallet.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'price', 'quantity', 'value'];
  dataSource: Array<Partial<Asset>> = [];

  constructor(private wallet: WalletService) { }

  ngOnInit(): void {

    if (this.wallet?.assets) this.refreshData();

    this.wallet.onRefresh$.pipe(
      map(() => {
        this.refreshData();
      })
    ).subscribe();

  }

  private refreshData() {
    this.dataSource = Object.values(this.wallet.assets)
      .sort((assetA, assetB) => (assetA?.value || 0) > (assetB?.value || 0) ? -1 : 1);

    console.info(this.dataSource);
  }

}
