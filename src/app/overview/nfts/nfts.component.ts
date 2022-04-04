import { Component, OnInit } from '@angular/core';
import {WalletService} from "../../services/wallet.service";
import {OwnedNFT} from "../../services/explorers/nfts-api.service";

@Component({
  selector: 'app-nfts',
  templateUrl: './nfts.component.html',
  styleUrls: ['./nfts.component.scss']
})
export class NftsComponent implements OnInit {

  constructor(public wallet: WalletService) { }

  ngOnInit(): void {
  }

  openTokenURI(nft: OwnedNFT) {
    if (nft?.tokenUri?.gateway) window.open(nft.tokenUri.gateway, '__blank');
  }
}
