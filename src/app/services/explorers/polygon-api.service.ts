import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EtherscanBalanceResult } from './etherscan-api.service';
import { environment } from 'src/environments/environment';

type PolygonBalanceResult = EtherscanBalanceResult;

@Injectable({
  providedIn: 'root',
})
export class PolygonApiService {
  private API_KEY = environment.polygonApiKey;
  private API_ENDPOINT = 'https://api.polygonscan.com/api';

  constructor(private http: HttpClient) {}

  getBalance(address: string): Promise<number> {
    return this.http
      .get<PolygonBalanceResult>(
        this.API_ENDPOINT +
          '?module=account&action=balance&address=' +
          address +
          '&apikey=' +
          this.API_KEY
      )
      .toPromise()
      .then((res: PolygonBalanceResult | undefined) => {
        return res?.result !== undefined ? parseInt(res.result, 10) : 0;
      });
  }
}
