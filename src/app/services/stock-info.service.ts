import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StockInfoService {
  apiUrl: string = 'https://finnhub.io/api/v1/';
  constructor(private http: HttpClient) {}

  getStckCompanyNames(symbol: string) {
    return this.http.get(
      `${this.apiUrl}search?q=${symbol}&token=bu4f8kn48v6uehqi3cqg`
    );
  }

  getQuotesInfo(symbol: string) {
    return this.http.get(
      `${this.apiUrl}quote?symbol=${symbol}&token=bu4f8kn48v6uehqi3cqg`
    );
  }

  getSentimentInfo(symbol: string, from: string, to: string) {
    return this.http.get(
      `${this.apiUrl}stock/insider-sentiment?symbol=${symbol}&from=${from}&to=${to}&token=bu4f8kn48v6uehqi3cqg`
    );
  }
}
