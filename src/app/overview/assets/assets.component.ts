import { Component, OnInit } from '@angular/core';
import {Asset, WalletService} from "../../services/wallet.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'price', 'quantity', 'value'];
  dataSource: Array<Partial<Asset>> = [];

  constructor(private wallet: WalletService) { }

  ngOnInit(): void {

    if (this.wallet?.assets) this.dataSource = Object.values(this.wallet.assets);

    this.wallet.onRefresh$.pipe(
      map(() => {
        this.dataSource = Object.values(this.wallet.assets);
      })
    ).subscribe();

  }

}
