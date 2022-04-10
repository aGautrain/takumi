import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EtherscanBalanceResult } from './etherscan-api.service';
import { environment } from 'src/environments/environment';

// alias
type BscscanBalanceResult = EtherscanBalanceResult;

@Injectable({
  providedIn: 'root',
})
export class BinanceApiService {
  private API_KEY = environment.bscScanApiKey;
  private API_ENDPOINT = 'https://api.bscscan.com/api';

  constructor(private http: HttpClient) {}

  getBalance(address: string): Promise<number> {
    return this.http
      .get<BscscanBalanceResult>(
        this.API_ENDPOINT +
          '?module=account&action=balance&address=' +
          address +
          '&apikey=' +
          this.API_KEY
      )
      .toPromise()
      .then((res: BscscanBalanceResult | undefined) => {
        return res?.result !== undefined ? parseInt(res.result, 10) : 0;
      });
  }
}
