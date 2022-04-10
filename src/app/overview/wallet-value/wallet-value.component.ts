import { Component } from '@angular/core';
import { WalletService } from '../../services/wallet.service';

/*
  Composant très simple qui affiche la valeur totale du Wallet
*/

@Component({
  selector: 'app-wallet-value',
  templateUrl: './wallet-value.component.html',
  styleUrls: ['./wallet-value.component.scss'],
})
export class WalletValueComponent {
  constructor(public wallet: WalletService) {}
}
