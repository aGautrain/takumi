import { Injectable } from '@angular/core';

/*
    Service pour convertir un symbole (par exemple avax) en id CoinGecko (=> avalanche-2)
    On utilise quasi exclusivement des symboles dans l'application, mais certaines APIs ont leur propres identifiants
 */

@Injectable({
  providedIn: 'root',
})
export class SymbolToIdService {
  symbolToCoinGecko: Record<string, string> = {
    avax: 'avalanche-2',
    eth: 'ethereum',
    ftm: 'fantom',
    matic: 'matic-network',
    bnb: 'binancecoin',
  };

  constructor() {}

  getCoinGeckoId(symbol: string): string {
    return this.symbolToCoinGecko[symbol];
  }
}
