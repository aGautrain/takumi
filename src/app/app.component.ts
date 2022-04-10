import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';

/*
    Composant principal de l'application
    Gère l'affichage avec la barre du haut, le menu latéral à gauche
    et le contenu qui change en fonction de la route (/assets, /overview, /asset/eth, etc.)
    cf app-routing.module.ts
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('snav', { static: true }) snav: MatDrawer | undefined = undefined;

  mobileQuery: MediaQueryList;

  private readonly _mobileQueryListenerAutoOpen: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListenerAutoOpen = () => {
      if (!this.mobileQuery.matches) this.snav?.open();
      changeDetectorRef.detectChanges();
    };

    this.mobileQuery.addListener(this._mobileQueryListenerAutoOpen);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListenerAutoOpen);
  }
}
