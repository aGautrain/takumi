import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EtherscanBalanceResult } from './etherscan-api.service';

type AvaxBalanceResult = EtherscanBalanceResult

export interface AvaxGasResult {
  status: string;
  message: string;
  result: string;
}

@Injectable({
  providedIn: 'root'
})
export class AvaxApiService {

  private API_KEY = environment.snowtraceApiKey;
  private API_ENDPOINT = 'https://api.snowtrace.io/api';

  constructor(private http: HttpClient) { }

  getBalance(address: string): Promise<number> {
    return this.http.get<AvaxBalanceResult>(
      this.API_ENDPOINT + '?module=account&action=balance&address=' + address + '&tag=latest&apikey=' + this.API_KEY)
      .toPromise().then((res: AvaxBalanceResult | undefined) => {
        return res?.result !== undefined ? parseInt(res.result, 10) : 0
      });
  }

  getGas(): Promise<number> {
    return this.http.get<AvaxGasResult>(
      this.API_ENDPOINT + '?module=gastracker&action=gasoracle' + '&apikey=' + this.API_KEY)
    .toPromise().then((res: AvaxGasResult | undefined) => {
      return res?.result !== undefined ? parseInt(res.result, 10) : 0
    });
  }
}
