import { Component, OnInit } from '@angular/core';
import {WalletService} from "../../services/wallet.service";

@Component({
  selector: 'app-wallet-value',
  templateUrl: './wallet-value.component.html',
  styleUrls: ['./wallet-value.component.css']
})
export class WalletValueComponent implements OnInit {

  constructor(public wallet: WalletService) { }

  ngOnInit(): void {
  }

}
