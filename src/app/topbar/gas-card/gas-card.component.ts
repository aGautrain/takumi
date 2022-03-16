import { Component, OnInit } from '@angular/core';
import { CoinmarketApiService, CryptocurrencyInfo } from 'src/app/services/coinmarket-api.service';
import Web3 from 'web3';


interface Crypto {
  logo: string;
  id: string;
  name: string;
  slug: string;
}

@Component({
  selector: 'app-gas-card',
  templateUrl: './gas-card.component.html',
  styleUrls: ['./gas-card.component.css']
})
export class GasCardComponent implements OnInit {

  selectedCrypto: string = '1';

  cryptos: CryptocurrencyInfo[] = [];

  constructor(private coinmarketApi: CoinmarketApiService) { }

  async ngOnInit() {

    await this.initEthereum();

    const blockchainsInfos = await this.coinmarketApi.getBlockchainsInfos();

    if (blockchainsInfos) this.cryptos = Object.values(blockchainsInfos);

    console.info(blockchainsInfos);


    this.cryptos = this.cryptos.map((crypto) => ({
      ...crypto,
      name: crypto.name.charAt(0).toUpperCase() + crypto.name.slice(1).toLowerCase()
    }));
  }

  async initEthereum() {
    if (typeof (window as any).ethereum !== 'undefined') {
      // Instance web3 with the provided information
      const web3 = new Web3((window as any).ethereum);
    try {
      // Request account access
      await (window as any).ethereum.enable();
      return true
    } catch (e) {
      console.error(e);
      // User denied access
      return false
      }
    }
    return false;
  }

}
