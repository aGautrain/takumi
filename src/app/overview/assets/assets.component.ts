import { Component, OnInit } from '@angular/core';
import { Asset, WalletService } from '../../services/wallet.service';
import { map } from 'rxjs/operators';

/*
  Composant qui affiche les cryptos possédées et leurs prix,
  la logique est dans le WalletService, ici on fait principalement de l'affichage
 */

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'quantity', 'value_24h'];
  dataSource: Array<Partial<Asset>> = [];

  constructor(public wallet: WalletService) {}

  ngOnInit(): void {
    if (this.wallet?.assets) this.refreshData();

    this.wallet.onRefresh$
      .pipe(
        map(() => {
          this.refreshData();
        })
      )
      .subscribe();
  }

  private refreshData() {
    this.dataSource = Object.values(this.wallet.assets).sort((assetA, assetB) =>
      (assetA?.value || 0) > (assetB?.value || 0) ? -1 : 1
    );
  }

  getPricesTooltip(asset: Asset): string {
    return `${
      asset.percent_change_7d > 0 ? '+' : ''
    }${asset.percent_change_7d.toFixed(0)}% 7j
    / ${
      asset.percent_change_30d > 0 ? '+' : ''
    }${asset.percent_change_30d.toFixed(0)}% 30j
    / ${
      asset.percent_change_90d > 0 ? '+' : ''
    }${asset.percent_change_90d.toFixed(0)}% 90j`;
  }
}
