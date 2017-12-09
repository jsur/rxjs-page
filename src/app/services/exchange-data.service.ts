import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class ExchangeDataService {
  private BASE_URL = 'https://api.gdax.com';

  constructor(private http: HttpClient) { }

  public getTrades(): Observable<any> {
    return Observable.interval(1000)
      .switchMap(() => this.http.get(`${this.BASE_URL}/products/ETH-USD/trades`));
  }
}
