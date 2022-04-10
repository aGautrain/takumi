import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

/*
    Premier service/API faite pour l'Ether
    Obtient la balance d'une adresse avec la méthode => getBalance

    Les autres services/APIs (avax, binance, fantom, polygon) sont identiques
    Mais disposent tout de même de leur fichier à part dans le cas où il faille implémenter
    de la logique spécifique

    On aurait pu imaginer un seul service MultichainAPI avec :
    - getBalance(address: string, blockchain: 'eth', 'avax', etc.)
    qui utilisait l'API Endpoint correspondant à la blockchain en paramètre
 */

export interface EtherscanBalanceResult {
  status: string;
  message: string;
  result: string;
}

@Injectable({
  providedIn: 'root',
})
export class EtherscanApiService {
  private API_KEY = environment.etherscanApiKey;
  private API_ENDPOINT = 'https://api.etherscan.io/api';

  constructor(private http: HttpClient) {}

  getBalance(address: string): Promise<number> {
    return this.http
      .get<EtherscanBalanceResult>(
        `${this.API_ENDPOINT}?module=account&action=balance&address=${address}&tag=latest&apikey=${this.API_KEY}`
      )
      .toPromise()
      .then((res: EtherscanBalanceResult | undefined) => {
        return res?.result !== undefined ? parseInt(res.result, 10) : 0;
      });
  }
}
