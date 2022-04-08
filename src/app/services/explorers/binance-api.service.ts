import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { EtherscanBalanceResult } from './etherscan-api.service';
import { environment } from 'src/environments/environment';

type BscscanBalanceResult = EtherscanBalanceResult

export interface BinanceGasResult {
  status: string;
  message: string;
  result: string;
}

@Injectable({
  providedIn: 'root'
})
export class BinanceApiService {
  private API_KEY = environment.BscscanApiKey;
  private API_ENDPOINT = 'https://api.bscscan.com/api';

  constructor(private http: HttpClient) { }

  getBalance(address: string): Promise<number> {
    return this.http.get<BscscanBalanceResult>(
      this.API_ENDPOINT + '?module=account&action=balance&address=' + address + '&apikey=' + this.API_KEY)
      .toPromise().then((res: BscscanBalanceResult | undefined) => {
        return res?.result !== undefined ? parseInt(res.result, 10) : 0
      });
  }

  getGas(): Promise<number> {
    return this.http.get<BinanceGasResult>(
      this.API_ENDPOINT + '?module=gastracker&action=gasoracle' + '&apikey=' + this.API_KEY)
    .toPromise().then((res: BinanceGasResult | undefined) => {
      return res?.result !== undefined ? parseInt(res.result, 10) : 0
    });
  }
}

