import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EtherscanBalanceResult } from './etherscan-api.service';
import { environment } from 'src/environments/environment';

type FantomBalanceResult = EtherscanBalanceResult;

@Injectable({
  providedIn: 'root',
})
export class FantomApiService {
  private API_KEY = environment.ftmscanApiKey;
  private API_ENDPOINT = 'https://api.ftmscan.com/api';

  constructor(private http: HttpClient) {}

  getBalance(address: string): Promise<number> {
    return this.http
      .get<FantomBalanceResult>(
        this.API_ENDPOINT +
          '?module=account&action=balance&address=' +
          address +
          '&tag=latest&apikey=' +
          this.API_KEY
      )
      .toPromise()
      .then((res: FantomBalanceResult | undefined) => {
        return res?.result !== undefined ? parseInt(res.result, 10) : 0;
      });
  }
}
