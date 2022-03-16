import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverviewComponent } from './overview/overview.component';
import { HistoryComponent } from './overview/history/history.component';
import { AssetsComponent } from './overview/assets/assets.component';
import { WalletValueComponent } from './overview/wallet-value/wallet-value.component';
import { AssetComponent } from './asset/asset.component';
import { MarketValueComponent } from './asset/market-value/market-value.component';
import { StatsComponent } from './asset/stats/stats.component';
import { TopbarComponent } from './topbar/topbar.component';
import { MenuComponent } from './menu/menu.component'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    HistoryComponent,
    AssetsComponent,
    WalletValueComponent,
    AssetComponent,
    MarketValueComponent,
    StatsComponent,
    TopbarComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
