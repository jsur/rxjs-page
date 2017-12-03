/* tslint:disable: use-life-cycle-interface */

import { Component, OnInit } from '@angular/core';
import { ExchangeDataService } from '../services/exchange-data.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/filter';
import { makeDecorator } from '@angular/core/src/util/decorators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {
  exampleOne = [];
  exampleTwo = [];
  endExample$: Subject<any> = new Subject();

  constructor(private trades: ExchangeDataService) { }

  ngOnInit() {
    this.exampleObservable()
      .takeUntil(this.endExample$)
      .subscribe(
        data => {
          this.exampleOne.unshift(data);
          if (this.exampleOne.length > 5) {
            this.exampleOne.pop();
        }
      });

    this.observableValuesExample()
      .subscribe(
        // Three types of values delivered
        data => this.exampleTwo.push(data),
        error => this.exampleTwo.push(error),
        () => this.exampleTwo.push('observable complete!')
      );
  }

  ngOnDestroy() {
    this.endExample$.next('end this!');
  }

  private exampleObservable(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      try {
        observer.next('Hello, I am pushed synchronously with observer.next().');
        observer.next('Hello again, I am also pushed synchronously');
        this.trades.getTrades()
          .throttleTime(1000)
          // .filter(data => data[0].side === 'buy')
          .subscribe(data => {
          observer.next(`${data[0].price} I am the most recent ${data[0].side === 'buy' ? 'buy' : 'sell'} price of ETH/USD, I am async.`);
        });
      } catch (error) {
        observer.error(error); // If something breaks and an error is caught
      }
    });
  }

  private observableValuesExample(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      try {
        observer.next('first');
        observer.next('second');
        observer.next('third');
        observer.complete();
        observer.next('fourth'); // This won't be reached.
      } catch (error) {
        observer.error(error);
      }
    });
  }

  unsub() {
    this.endExample$.next('end this!');
  }


}
