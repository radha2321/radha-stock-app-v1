import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { StockInfoComponent } from './components/stock-info/stock-info.component';

const stockInfoRoutes: Routes = [
  { path: '', component: StockInfoComponent, pathMatch: 'full' },
  { path: 'sentiment/:symbol', component: SentimentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(stockInfoRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
