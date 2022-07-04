import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverviewComponent } from './overview/overview.component';
import { AssetsComponent } from './overview/assets/assets.component';
import { WalletValueComponent } from './overview/wallet-value/wallet-value.component';
import { AssetComponent } from './asset/asset.component';
import { TopbarComponent } from './topbar/topbar.component';
import { HttpClientModule } from '@angular/common/http';

import { GasCardComponent } from './topbar/gas-card/gas-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GasPricesComponent } from './topbar/gas-card/gas-prices/gas-prices.component';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LineChartComponent } from './asset/line-chart/line-chart.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PriceCardComponent } from './asset/price-card/price-card.component';
import { MatTableModule } from '@angular/material/table';
import { NftsComponent } from './overview/nfts/nfts.component';
import { AddressDialogComponent } from './address-dialog/address-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ArraySortPipe } from './pipes/sort.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MetadataDialogComponent } from './overview/nfts/metadata-dialog/metadata-dialog.component';

const materialModules = [
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatSelectModule,
  MatIconModule,
  FlexLayoutModule,
  MatListModule,
  MatSidenavModule,
  MatTooltipModule,
  MatTableModule,
  MatDialogModule,
  MatInputModule,
  MatToolbarModule,
  MatButtonModule,
];

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    AssetsComponent,
    WalletValueComponent,
    AssetComponent,
    TopbarComponent,
    GasCardComponent,
    GasPricesComponent,
    LineChartComponent,
    PriceCardComponent,
    NftsComponent,
    AddressDialogComponent,
    ArraySortPipe,
    MetadataDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...materialModules,
    ReactiveFormsModule,
    OverlayModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
