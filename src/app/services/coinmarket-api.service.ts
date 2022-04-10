import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ALL_SUPPORTED_SYMBOLS, SupportedSymbol } from './wallet.service';

export interface CryptocurrencyInfo {
  id: number;
  name: string;
  symbol: SupportedSymbol;
  logo: string;
  slug: string;
  description: string;
  category: string;
}

export interface CryptocurrencyMarketInfo {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  last_updated: string;
}

@Injectable({
  providedIn: 'root',
})
export class CoinmarketApiService {
  private API_KEY = environment.coinmarketApiKey;
  private API_ENDPOINT = 'https://pro-api.coinmarketcap.com';

  constructor(private http: HttpClient) {}

  getCryptosInfos(
    symbols: SupportedSymbol[] = ALL_SUPPORTED_SYMBOLS
  ): Promise<Record<string, CryptocurrencyInfo>> {
    return this.http
      .get<{ data: Record<string, CryptocurrencyInfo[]> }>(
        this.API_ENDPOINT + '/v2/cryptocurrency/info',
        {
          params: new HttpParams()
            .set('symbol', symbols.join(','))
            .set(
              'aux',
              'urls,logo,description,tags,platform,date_added,notice,status'
            )
            .set('CMC_PRO_API_KEY', this.API_KEY),
        }
      )
      .pipe(
        map((res) => {
          return Object.entries(res?.data).reduce(
            (
              responseFormatted: Record<string, CryptocurrencyInfo>,
              [symbol, infos]
            ) => {
              if (symbol && infos?.length) responseFormatted[symbol] = infos[0];
              return responseFormatted;
            },
            {}
          );
        })
      )
      .toPromise() as Promise<Record<string, CryptocurrencyInfo>>;
  }

  getCryptosLatestMarketData(
    symbols: string[] = ALL_SUPPORTED_SYMBOLS
  ): Promise<Record<string, CryptocurrencyMarketInfo>> {
    return this.http
      .get<{
        data: Record<string, { quote: { EUR: CryptocurrencyMarketInfo } }>;
      }>(this.API_ENDPOINT + '/v1/cryptocurrency/quotes/latest', {
        params: new HttpParams()
          .set('symbol', symbols.join(','))
          .set('convert', 'EUR')
          .set('aux', 'cmc_rank,max_supply,circulating_supply')
          .set('skip_invalid', true)
          .set('CMC_PRO_API_KEY', this.API_KEY),
      })
      .pipe(
        map((res) => {
          return Object.entries(res.data).reduce(
            (
              responseFormatted: Record<string, CryptocurrencyMarketInfo>,
              [symbol, marketData]
            ) => {
              if (symbol && marketData)
                responseFormatted[symbol] = marketData['quote']['EUR'];
              return responseFormatted;
            },
            {}
          );
        })
      )
      .toPromise() as Promise<Record<string, CryptocurrencyMarketInfo>>;
  }
}
