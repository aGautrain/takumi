import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OwnedNFT } from '../../../services/explorers/nfts-api.service';

/*
  Composant pour afficher les métadonnées d'un NFT
  Prévu pour être affiché dans un dialogue
 */

@Component({
  selector: 'app-metadata-dialog',
  templateUrl: './metadata-dialog.component.html',
  styleUrls: ['./metadata-dialog.component.scss'],
})
export class MetadataDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MetadataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nft: OwnedNFT }
  ) {}
}
