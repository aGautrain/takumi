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

  coinmarketIdToSymbol: Record<string, string> = {
    '1027': 'eth'
  }

  constructor() { }

  getCoinGeckoId(symbol: string): string {
    return this.symbolToCoinGecko[symbol];
  }

  getCoinmarketSymbolFromId(id: string): string {
    return this.coinmarketIdToSymbol[id];
  }


}
