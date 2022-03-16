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

import { GasCardComponent } from './topbar/gas-card/gas-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';

const materialModules = [
  MatCardModule,
  MatSelectModule,
  MatIconModule
];


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
    MenuComponent,
    GasCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...materialModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
