import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

type SupportedSymbols = 'FTM' | 'MATIC' | 'AVAX' | 'BNB' | 'ETH';

const symbolConverterForOwlracle: Record<SupportedSymbols, string> = {
  FTM: 'ftm',
  MATIC: 'poly',
  AVAX: 'avax',
  ETH: 'eth',
  BNB: 'bsc',
};

@Injectable({
  providedIn: 'root',
})
export class OwlracleApiService {
  private API_KEY = environment.owlracleApiKey;

  private API_ENDPOINT = 'https://owlracle.info';

  constructor(private http: HttpClient) {}

  getGas(symbol: SupportedSymbols) {
    const owlracleId = symbolConverterForOwlracle[symbol];

    return this.http
      .get<any>(this.API_ENDPOINT + '/' + owlracleId + '/gas', {
        params: new HttpParams().set('apikey', this.API_KEY),
      })
      .toPromise();
  }
}
