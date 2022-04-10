import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  CoinmarketApiService,
  CryptocurrencyInfo,
} from 'src/app/services/coinmarket-api.service';
import { FormControl } from '@angular/forms';

/*
    Composant qui affiche un sélecteur de cryptos
    Et les prix du gas estimés pour la crypto sélectionnée
 */

@Component({
  selector: 'app-gas-card',
  templateUrl: './gas-card.component.html',
  styleUrls: ['./gas-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GasCardComponent implements OnInit {
  selectedCryptoFormControl: FormControl = new FormControl();
  selectedCrypto: CryptocurrencyInfo | undefined = undefined;

  cryptos: CryptocurrencyInfo[] = [];

  constructor(private coinmarketApi: CoinmarketApiService) {}

  async ngOnInit() {
    this.selectedCryptoFormControl.valueChanges.subscribe((id) => {
      this.selectedCrypto = this.cryptos.find((crypto) => crypto.id === id);
    });

    const blockchainsInfos = await this.coinmarketApi.getCryptosInfos();
    if (blockchainsInfos) this.cryptos = Object.values(blockchainsInfos);

    if (this.cryptos?.length) {
      this.selectedCryptoFormControl.setValue(this.cryptos[0].id);

      this.cryptos = this.cryptos.map((crypto) => ({
        ...crypto,
        name:
          crypto.name.charAt(0).toUpperCase() +
          crypto.name.slice(1).toLowerCase(),
      }));
    }
  }
}
