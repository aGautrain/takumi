import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CoinmarketApiService, CryptocurrencyInfo} from 'src/app/services/coinmarket-api.service';
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-gas-card',
  templateUrl: './gas-card.component.html',
  styleUrls: ['./gas-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GasCardComponent implements OnInit {

  selectedCryptoFormControl: FormControl = new FormControl();
  selectedCrypto: CryptocurrencyInfo | undefined = undefined;

  cryptos: CryptocurrencyInfo[] = [];

  constructor(private coinmarketApi: CoinmarketApiService) { }

  async ngOnInit() {

    this.selectedCryptoFormControl.valueChanges.subscribe((id) => {
      this.selectedCrypto = this.cryptos.find(crypto => crypto.id === id);
    });

    const blockchainsInfos = await this.coinmarketApi.getBlockchainsInfos();
    if (blockchainsInfos) this.cryptos = Object.values(blockchainsInfos);

    if (this.cryptos?.length) {
      this.selectedCryptoFormControl.setValue(this.cryptos[0].id);

      this.cryptos = this.cryptos.map((crypto) => ({
        ...crypto,
        name: crypto.name.charAt(0).toUpperCase() + crypto.name.slice(1).toLowerCase()
      }));
    }
  }

  /*async initEthereum() {
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
  }*/

}
