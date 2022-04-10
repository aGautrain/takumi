import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { OwlracleApiService } from 'src/app/services/owlracle-api.service';
import { SupportedSymbol } from '../../../services/wallet.service';

interface Speed {
  acceptance: number;
  gasPrice: number;
  estimatedFee: number;
}

@Component({
  selector: 'app-gas-prices',
  templateUrl: './gas-prices.component.html',
  styleUrls: ['./gas-prices.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GasPricesComponent {
  @Input() crypto: SupportedSymbol | undefined;
  estimations: any;

  slowGas: number = 0;
  averageGas: number = 0;
  fastGas: number = 0;
  instantGas: number = 0;

  constructor(private owlracleApi: OwlracleApiService) {}

  // quand on change de crypto sélectionnée, on récupère les nouvelles estimations des prix du gas
  async ngOnChanges(changes: SimpleChanges) {
    const nextCrypto =
      changes['crypto']?.currentValue !== changes['crypto'].previousValue &&
      changes['crypto'].currentValue;

    if (nextCrypto && nextCrypto !== 'BNB') {
      this.crypto = nextCrypto;
      this.estimations = await this.owlracleApi.getGas(nextCrypto);

      let { speeds }: { speeds: Speed[] } = this.estimations;

      const acceptanceToGasPrice: Record<string, number> = {};
      speeds.forEach((speed: Speed) => {
        acceptanceToGasPrice[speed.acceptance.toString()] = speed.gasPrice;
      });

      const acceptanceSorted: number[] = Object.keys(acceptanceToGasPrice)
        .map((acceptance) => parseFloat(acceptance))
        .sort();

      if (acceptanceSorted?.length >= 4) {
        this.slowGas = Math.round(acceptanceToGasPrice[acceptanceSorted[0]]);
        this.averageGas = Math.round(acceptanceToGasPrice[acceptanceSorted[1]]);
        this.fastGas = Math.round(acceptanceToGasPrice[acceptanceSorted[2]]);
        this.instantGas = Math.round(acceptanceToGasPrice[acceptanceSorted[3]]);
      }
    } else {
      this.slowGas = 5;
      this.averageGas = 5;
      this.fastGas = 5;
      this.instantGas = 5;
    }
  }
}
