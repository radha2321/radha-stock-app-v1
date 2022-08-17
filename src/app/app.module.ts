import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { StockInfoComponent } from './components/stock-info/stock-info.component';
import { StockInfoService } from './services/stock-info.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, StockInfoComponent, SentimentComponent],
  providers: [StockInfoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
