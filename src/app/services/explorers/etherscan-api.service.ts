import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";


interface EtherscanBalanceResult {
  status: string;
  message: string;
  result: string;
}

@Injectable({
  providedIn: 'root'
})
export class EtherscanApiService {

  private API_KEY = environment.etherscanApiKey;

  private API_ENDPOINT = 'https://api.etherscan.io/api';

  constructor(private http: HttpClient) { }

  getBalance(address: string): Promise<number> {
    return this.http.get<EtherscanBalanceResult>(
      `${this.API_ENDPOINT}?module=account&action=balance&address=${address}&tag=latest&apikey=${this.API_KEY}`
    ).toPromise()
      .then((res: EtherscanBalanceResult | undefined) => {
      return res?.result !== undefined ? parseInt(res.result, 10) : 0
    });
  }
}
