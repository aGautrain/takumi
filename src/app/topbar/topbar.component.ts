import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddressDialogComponent } from '../address-dialog/address-dialog.component';
import { AddressHistoryService } from '../services/address-history.service';
import { WalletService } from '../services/wallet.service';

/*
    Barre du haut avec différents boutons cliquables (darkmode, menu responsive, prix du gas, adresse)
 */

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  @Input() mobile: boolean = false;
  @Output() toggleMenu: EventEmitter<void> = new EventEmitter<void>();

  showGasPrices: boolean = false;
  darkmodeEnabled: boolean = true;

  @Output() switchMenuStatus: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private _dialog: MatDialog,
    private addressHistory: AddressHistoryService,
    public walletService: WalletService
  ) { }

  async ngOnInit() {
    if (this.addressHistory.getLastAddress()) await this.useAddress(this.addressHistory.getLastAddress());
    else if (!this.walletService?.getAddress()) await this.openAddressDialog();
  }

  async openAddressDialog() {
    const dialogRef = this._dialog.open(AddressDialogComponent, {
      minWidth: '40vw',
      data: {
        knownAddresses: this.addressHistory.getAddresses(),
        currentAddress: this.walletService.getAddress()
      }
    });

    const address = await dialogRef.afterClosed().toPromise();
    if (address) await this.useAddress(address);
  }

  private async useAddress(address: string) {
    this.addressHistory.putAddress(address);
    this.walletService.setAddress(address);
    await this.walletService.loadAssets();
    await this.walletService.loadNFTS();
  }

  switchDarkmode() {
    this.darkmodeEnabled = !this.darkmodeEnabled;

    const body: HTMLBodyElement = document.querySelector(
      'body'
    ) as HTMLBodyElement;
    if (this.darkmodeEnabled) body.classList.add('darkMode');
    else body.classList.remove('darkMode');
  }
}
