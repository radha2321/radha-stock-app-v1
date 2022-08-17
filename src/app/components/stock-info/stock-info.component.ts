import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StockInfo, Stocks } from '../../models/stock';
import { StockInfoService } from '../../services/stock-info.service';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.css'],
})
export class StockInfoComponent implements OnInit, OnDestroy {
  stockTrackerFormGroup: FormGroup;
  stock: StockInfo[] = [];
  stockList: Stocks[] = [];
  quoteData = [];
  subscription: Subscription = new Subscription();

  constructor(private readonly stockService: StockInfoService) {}

  ngOnInit(): void {
    this.createStockTracerForm();
    this.getInititalStocksInfo();
  }

  createStockTracerForm(): void {
    this.stockTrackerFormGroup = new FormGroup({
      symbol: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(5),
      ]),
    });
  }

  getInititalStocksInfo(): void {
    const stocks = localStorage.getItem('stockData');
    this.stockList = stocks ? JSON.parse(stocks) : [];
  }

  submit(): void {
    this.getStckCompanyNames();
  }

  getStckCompanyNames(): void {
    const { symbol } = this.stockTrackerFormGroup.value;
    this.subscription.add(
      this.stockService.getStckCompanyNames(symbol).subscribe((data: any) => {
        let list = {
          description: data.result[0].description,
          symbol: data.result[0].symbol,
        };
        this.stock.push(list);
        setTimeout(() => {
          this.getQuoteDetails();
        }, 500);
      })
    );
  }

  getQuoteDetails(): void {
    const { symbol } = this.stockTrackerFormGroup.value;
    this.subscription.add(
      this.stockService.getQuotesInfo(symbol).subscribe((data) => {
        this.quoteData.push(data);
        for (let i = 0; i < this.stock.length; i++) {
          this.stockList[i] = {
            description: this.stock[i].description,
            symbol: this.stock[i].symbol,
            d: this.quoteData[i]?.d,
            c: this.quoteData[i]?.c,
            o: this.quoteData[i]?.o,
            h: this.quoteData[i]?.h,
          };
        }
        localStorage.setItem('stockData', JSON.stringify(this.stockList));
      })
    );
    this.stockTrackerFormGroup.reset();
  }

  removeStock(indx: number): void {
    this.stockList.splice(indx, 1);
    this.stock = this.stockList;
    localStorage.setItem('stockData', JSON.stringify(this.stockList));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
