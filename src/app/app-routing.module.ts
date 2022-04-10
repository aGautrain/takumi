import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetComponent } from './asset/asset.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  { path: 'asset/:symbol', component: AssetComponent },
  { path: 'overview', component: OverviewComponent },
  { path: '**', redirectTo: 'overview' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
