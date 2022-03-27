import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SymbolToIdService } from './symbol-to-id.service';


export interface CryptocurrencyChartData {
  prices: Array<[number, number]>;
  market_caps: Array<[number, number]>;
  total_volumes: Array<[number, number]>;
}

@Injectable({
  providedIn: 'root'
})
export class CoinGeckoAPIService {

  private API_ENDPOINT = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient, private symbol2id: SymbolToIdService) { }

  getCryptocurrencyChart(symbol: string): Promise<CryptocurrencyChartData> {

    const coingeckoId = this.symbol2id.getCoinGeckoId(symbol);

    //return new Promise((res) => res(etherChartMocked));
    return this.http.get<CryptocurrencyChartData>(`${this.API_ENDPOINT}/coins/${coingeckoId}/market_chart`, {
      params: new HttpParams()
        .set('vs_currency', 'eur')
        .set('days', '30')
        .set('interval', 'daily')
    }).toPromise() as Promise<CryptocurrencyChartData>;
  }
}
