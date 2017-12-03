/* tslint:disable: use-life-cycle-interface */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/merge';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {
  fromArray: string[];
  mergedResult: any[] = [];
  endExample$: Subject<any> = new Subject();

  constructor() { }

  ngOnInit() {

    this.exampleObservableFromArray()
      .subscribe(data => this.fromArray = data);

    const merged =
      this.exampleObservableFromArray()
        .merge(this.exampleWithSomeNumbers())
        .merge(this.anotherExampleFromArray());
    // merge emits concurrently, and thus the numbers will be the last ones emitted.
    merged
      .takeUntil(this.endExample$)
      .subscribe(mergeData => {
      this.mergedResult.unshift(mergeData);
    });
  }

  ngOnDestroy() {
    this.endExample$.next('end this!');
  }

  exampleObservableFromArray(): Observable<string[]> {
    return Observable.of(['hello', 'we', 'are', 'a', 'stream', '!']);
  }

  anotherExampleFromArray(): Observable<string[]> {
    return Observable.of(['other', 'stuff', 'from', 'another', 'array', ' ']);
  }

  // This one never stops unless unsubscribed!
  exampleWithSomeNumbers(): Observable<number> {
    return Observable.interval(1500);
  }

  unsub() {
    this.endExample$.next('end this!');
  }

}
