import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SymbolToIdService } from './symbol-to-id.service';

/*
  CoinGecko
  https://www.coingecko.com/fr

  permet d'obtenir l'évolution du prix d'une crypto et donc de construire
  les graphes autour
  (payant sur CoinMarket)

 */

// prices, market_caps, total_volumes sont organisés en tableau de paires
// le premier élément de la paire, paire[0] est la date, le second, paire[1] la valeur
export interface CryptocurrencyChartData {
  prices: Array<[number, number]>;
  market_caps: Array<[number, number]>;
  total_volumes: Array<[number, number]>;
}

@Injectable({
  providedIn: 'root',
})
export class CoinGeckoAPIService {
  private API_ENDPOINT = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient, private symbol2id: SymbolToIdService) {}

  // renvoie les données sur 30 jours nécessaires à la construction d'un graphe
  getCryptocurrencyChart(symbol: string): Promise<CryptocurrencyChartData> {
    const coingeckoId = this.symbol2id.getCoinGeckoId(symbol);

    return this.http
      .get<CryptocurrencyChartData>(
        `${this.API_ENDPOINT}/coins/${coingeckoId}/market_chart`,
        {
          params: new HttpParams()
            .set('vs_currency', 'eur')
            .set('days', '30')
            .set('interval', 'daily'),
        }
      )
      .toPromise() as Promise<CryptocurrencyChartData>;
  }
}
