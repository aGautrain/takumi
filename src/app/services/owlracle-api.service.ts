import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

type SupportedSymbols = 'FTM' | 'MATIC' | 'AVAX' | 'BNB' | 'ETH';

@Injectable({
  providedIn: 'root',
})
export class OwlracleApiService {

  private API_ENDPOINT = 'http://localhost:1337';

  constructor(private http: HttpClient) { }

  getGas(symbol: SupportedSymbols) {

    return this.http
      .get<any>(this.API_ENDPOINT + '/getGas', {
        params: new HttpParams().set('symbol', symbol),
      })
      .toPromise();
  }
}
