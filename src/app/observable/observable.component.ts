/* tslint:disable: use-life-cycle-interface */

import { Component, OnInit } from '@angular/core';
import { ExchangeDataService } from '../services/exchange-data.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {
  exampleOne = [];
  endExample$: Subject<any> = new Subject();

  constructor(private trades: ExchangeDataService) { }

  ngOnInit() {
    this.exampleObservable()
      .takeUntil(this.endExample$)
      .subscribe(
        data => {
          this.exampleOne.unshift(data);
          if (this.exampleOne.length === 10) {
            this.exampleOne.pop();
        }
      });
  }

  ngOnDestroy() {
    this.endExample$.next('end this!');
  }

  private exampleObservable(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      observer.next('Hello, I am pushed syncronously with observer.next().');
      observer.next('Hello again, I am also pushed syncronously');
      this.trades.getTrades()
        .throttleTime(1000)
        // .filter(data => data[0].side === 'buy')
        .subscribe(data => {
        observer.next(`${data[0].price} I am the most recent ${data[0].side === 'buy' ? 'buy' : 'sell'} price of ETH/USD, I am async.`);
      });
    });
  }

  unsub() {
    this.endExample$.next('end this!');
  }


}
