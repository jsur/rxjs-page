/* tslint:disable: use-life-cycle-interface */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ExchangeDataService } from '../services/exchange-data.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-combine-latest',
  templateUrl: './combine-latest.component.html',
  styleUrls: ['./combine-latest.component.css']
})
export class CombineLatestComponent implements OnInit {
  lastTrades: {}[];
  subscription$: Subject<any> = new Subject();

  constructor(private trades: ExchangeDataService) { }

  ngOnInit() {
    this.trades.getTrades()
      .takeUntil(this.subscription$)
      .subscribe(
        data => {
          this.lastTrades = data;
        },
        error => console.warn(error),
        () => console.log('complete!')
      );
  }

  ngOnDestroy(): void {
    this.subscription$.next('stop');
  }

}
