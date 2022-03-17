import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, SimpleChange, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { OwlracleApiService } from 'src/app/services/owlracle-api.service';

interface Speed {
  acceptance: number; gasPrice: number; estimatedFee: number;
}

@Component({
  selector: 'app-gas-prices',
  templateUrl: './gas-prices.component.html',
  styleUrls: ['./gas-prices.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GasPricesComponent {

  @Input() crypto: string | undefined;
  estimations: any;

  slowGas: number = 0;
  averageGas: number = 0;
  fastGas: number = 0;
  instantGas: number = 0;

  constructor(private owlracleApi: OwlracleApiService, private _cdr: ChangeDetectorRef) { }

  async ngOnChanges(changes: SimpleChanges) {
    const nextCrypto = changes['crypto']?.currentValue !== changes['crypto'].previousValue && changes['crypto'].currentValue;

    if (nextCrypto && nextCrypto !== 'BNB') {
      this.crypto = nextCrypto;
      this.estimations = await this.owlracleApi.getGas(nextCrypto);

      let { speeds }: { speeds: Speed[] } = this.estimations;

      const acceptanceToGasPrice: Record<string, number> = {};
      speeds.forEach((speed: Speed) => {
        acceptanceToGasPrice[speed.acceptance.toString()] = speed.gasPrice;
      });

      const acceptanceSorted: number[] = Object.keys(acceptanceToGasPrice).map(acceptance => parseFloat(acceptance)).sort();

      if (acceptanceSorted?.length >= 4) {
        this.slowGas = Math.round(acceptanceToGasPrice[acceptanceSorted[0]]);
        this.averageGas = Math.round(acceptanceToGasPrice[acceptanceSorted[1]]);
        this.fastGas = Math.round(acceptanceToGasPrice[acceptanceSorted[2]]);
        this.instantGas = Math.round(acceptanceToGasPrice[acceptanceSorted[3]]);
        this._cdr.markForCheck();
      }
    } else {
      this.slowGas = 5;
      this.averageGas = 5;
      this.fastGas = 5;
      this.instantGas = 5;
      this._cdr.markForCheck();
    }
  }

}
