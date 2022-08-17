import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { months } from '../../constants/months-constant';
import { Sentiment } from '../../models/sentiment';
import { StockInfoService } from '../../services/stock-info.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit, OnDestroy {
  sentimentData: Sentiment[] = [];
  symbol: string;
  fromDate: string;
  toDate: string;
  symbolName: string;
  subscription: Subscription = new Subscription();

  constructor(
    private readonly stockService: StockInfoService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    this.getDateInfo();
    this.getSentimentInfo();
  }

  getDateInfo(): void {
    const todayDate = new Date().toISOString().slice(0, 10);
    const d = new Date(todayDate);
    d.setMonth(d.getMonth() - 3);
    this.toDate = todayDate;
    this.fromDate = d.toISOString().slice(0, 10);
  }

  getSentimentInfo(): void {
    this.subscription.add(
      this.stockService
        .getSentimentInfo(this.symbol, this.fromDate, this.toDate)
        .subscribe((res: any) => {
          this.sentimentData = res.data;
          this.symbolName = res.symbol;
        })
    );
  }

  getMonthInfo(num: number): string {
    return months[num].toUpperCase();
  }

  getImage(value: number): string {
    if (value > 0) {
      return 'https://cdn1.iconfinder.com/data/icons/basic-ui-elements-coloricon/21/11-512.png';
    } else {
      return 'https://st2.depositphotos.com/5266903/8456/v/950/depositphotos_84568938-stock-illustration-arrow-down-flat-red-color.jpg';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
