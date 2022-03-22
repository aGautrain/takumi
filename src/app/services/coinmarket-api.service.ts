import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { cryptocurrenciesMocked } from "./cryptocurrencies.mock";


export interface CryptocurrencyInfo {
  id: number;
  name: string;
  symbol: string;
  logo: string;
  slug: string;
  description: string;
  category: string;
}

type CachedRegistry<T> = Record<string, { date: number; value: T }>

@Injectable({
  providedIn: 'root'
})
export class CoinmarketApiService {

  // we should use an environment variable instead of writing API KEY
  // to avoid leaks when exposing the code (github, etc.)
  private API_KEY = environment.coinmarketApiKey;

  private API_ENDPOINT = 'https://pro-api.coinmarketcap.com/v2';

  private SUPPORTED_SLUGS = ['avalanche', 'ethereum', 'bnb', 'fantom', 'polygon'];

  private cachePersistency: number = 1000 * 60 * 30; // 30 minutes
  private cryptocurrencyInfosCached: CachedRegistry<Required<CryptocurrencyInfo>> = {};

  constructor(private http: HttpClient) { }

  private cacheRelevant(dataCached: { date: number, value: unknown }): boolean {
    return dataCached && dataCached.date > Date.now() - this.cachePersistency
  }

  getBlockchainsInfos(): Promise<Record<string, CryptocurrencyInfo>> {

    return new Promise((res) => res(cryptocurrenciesMocked));

    return this.http.get<{ data: Record<string, CryptocurrencyInfo> }>(this.API_ENDPOINT + '/cryptocurrency/info', {
      params: new HttpParams()
        .set('slug', this.SUPPORTED_SLUGS.join(','))
        .set('aux', 'urls,logo,description,tags,platform,date_added,notice,status')
        .set('CMC_PRO_API_KEY', this.API_KEY)
    })
      .pipe(map(res => res?.data))
      .toPromise() as Promise<Record<string, CryptocurrencyInfo>>;
  }
}
