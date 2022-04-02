import { Component, OnInit } from '@angular/core';
import {Asset, WalletService} from "../../services/wallet.service";
import {map} from "rxjs/operators";




const ASSETS: Asset[] = [
  {
    symbol: 'avax',
    logo: 'https://token-icons.s3.amazonaws.com/43e05303-bf43-48df-be45-352d7567ff39.png',
    name: 'Avalanche',
    price: 80.4,
    quantity: 251.34,
    value: 21079.8
  }
];

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

    this.wallet.onRefresh$.pipe(
      map(() => {
        this.dataSource = Object.values(this.wallet.assets);
      })
    ).subscribe();

  }

}
