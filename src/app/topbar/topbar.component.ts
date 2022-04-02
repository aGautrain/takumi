import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddressDialogComponent} from "../address-dialog/address-dialog.component";
import {WalletService} from "../services/wallet.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  showGasPrices: boolean = false;


  @Output() switchMenuStatus: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _dialog: MatDialog, public walletService: WalletService) { }

  ngOnInit(): void {
  }

  async openAddressDialog() {
    const dialogRef = this._dialog.open(AddressDialogComponent, {
      minWidth: '40vw'
    });

    const address = await dialogRef.afterClosed().toPromise();
    if (address) {
      this.walletService.setAddress(address);
      await this.walletService.loadAssets();
    }
  }

}
