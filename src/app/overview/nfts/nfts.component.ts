import { Component } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { OwnedNFT } from '../../services/explorers/nfts-api.service';
import { MatDialog } from '@angular/material/dialog';
import { MetadataDialogComponent } from './metadata-dialog/metadata-dialog.component';

@Component({
  selector: 'app-nfts',
  templateUrl: './nfts.component.html',
  styleUrls: ['./nfts.component.scss'],
})
export class NftsComponent {
  constructor(public wallet: WalletService, private _dialog: MatDialog) {}

  openNFTMetadataDialog(nft: OwnedNFT) {
    this._dialog.open(MetadataDialogComponent, {
      minWidth: '40vw',
      data: { nft }, // on fournit au dialogue le NFT sélectionné
    });
  }
}
