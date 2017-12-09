/* tslint:disable max-line-length */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ExchangeDataService } from '../services/exchange-data.service';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'app-observer',
  templateUrl: './observer.component.html',
  styleUrls: ['./observer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ObserverComponent implements OnInit {
  observerData = [];

  constructor(private trades: ExchangeDataService) { }

  ngOnInit() {
    this.trades.getTrades()
      .takeUntil(Observable.timer(10000))
      .subscribe(
        data => this.observerData.unshift(`${data[0].price} I am the most recent ${data[0].side === 'buy' ? 'BUY' : 'SELL'} price of ETH/USD`),
        err => this.observerData.unshift('error occurred!'),
        () => this.observerData.unshift('complete after 10 secs!')
      );
  }

}
