import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SymbolToIdService {

  symbolToCoinGecko: Record<string, string> = {
    'avax': 'avalanche-2',
    'eth': 'ethereum',
    'ftm': 'fantom',
    'matic': 'matic-network',
    'bnb': 'binancecoin'
  }

  constructor() { }

  getCoinGeckoId(symbol: string): string {
    return this.symbolToCoinGecko[symbol];
  }


}
