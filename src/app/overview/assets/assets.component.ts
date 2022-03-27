import { Component, OnInit } from '@angular/core';

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
  origin?: Blockchain;
}

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
  dataSource = ASSETS;

  constructor() { }

  ngOnInit(): void {
  }

}
