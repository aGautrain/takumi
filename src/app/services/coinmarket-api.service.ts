import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


export interface CryptocurrencyInfo {
  urls: Record<string, string>;
  logo: string;
  id: number;
  name: string;
  symbol: string;
  slug: string;
  description: string;
  date_added: string;
  date_launched: string;
  tags: string[];
  platform: string;
  category: string;
}

type CachedRegistry<T> = Record<string, { date: number; value: T }>

@Injectable({
  providedIn: 'root'
})
export class CoinmarketApiService {

  // we should use an environment variable instead of writing API KEY
  // to avoid leaks when exposing the code (github, etc.)
  private API_KEY = '50ec345e-bc25-4a84-b481-919f35f5c14e';

  private API_ENDPOINT = 'https://pro-api.coinmarketcap.com/v2';

  private cachePersistency: number = 1000 * 60 * 30; // 30 minutes
  private cryptocurrencyInfosCached: CachedRegistry<CryptocurrencyInfo> = {};

  constructor(private http: HttpClient) { }

  private cacheRelevant(dataCached: { date: number, value: unknown }): boolean {
    return dataCached && dataCached.date > Date.now() - this.cachePersistency
  }

  getCryptocurrencyInfo(id: string): Promise<CryptocurrencyInfo | undefined> {

    console.info(this.cryptocurrencyInfosCached);
    const cached = this.cryptocurrencyInfosCached[id];
    console.info(cached);
    console.info('fetching from cache', this.cacheRelevant(cached));
    if (this.cacheRelevant(cached)) return new Promise((resolve) => resolve(cached.value));
    else return this.http.get<{ data: Record<string, CryptocurrencyInfo> }>(this.API_ENDPOINT + '/cryptocurrency/info', {
      params: new HttpParams()
        .set('id', id)
        .set('aux', 'urls,logo,description,tags,platform,date_added,notice,status')
        .set('CMC_PRO_API_KEY', this.API_KEY)
    })
      .pipe(
        map(res => {
          const info = res?.data[id];
          this.cryptocurrencyInfosCached[id] = { date: Date.now(), value: info };
          console.info(this.cryptocurrencyInfosCached);
          return info;
        }))
      .toPromise();
  }
}
