import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  // responsive sidenav with angular material
  // https://material.angular.io/components/sidenav/examples#sidenav-responsive

  @ViewChild('snav', { static: true }) snav: MatDrawer | undefined = undefined;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  private _mobileQueryListenerAutoOpen: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this._mobileQueryListenerAutoOpen = () => {
      if (!this.mobileQuery.matches) this.snav?.open();
    };

    this.mobileQuery.addListener(this._mobileQueryListener);
    this.mobileQuery.addListener(this._mobileQueryListenerAutoOpen);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.mobileQuery.removeListener(this._mobileQueryListenerAutoOpen);
  }
}
