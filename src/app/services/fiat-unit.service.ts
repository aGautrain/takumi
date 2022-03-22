import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export type FiatUnitSupported = 'eur' | 'usd';

@Injectable({
  providedIn: 'root'
})
export class FiatUnitService {

  unitSymbol: Record<string, string> = {
    'eur': '€',
    'usd': '$'
  };

  private unit$$: BehaviorSubject<FiatUnitSupported> = new BehaviorSubject<FiatUnitSupported>('eur');
  unit$: Observable<FiatUnitSupported> = this.unit$$.asObservable();

  get symbol$(): Observable<string> {
    return this.unit$.pipe(
      map(unit => this.unitSymbol[unit])
    );
  }

  constructor() { }

  changeUnit(nextUnit: FiatUnitSupported) {
    this.unit$$.next(nextUnit);
  }

  getUnit(): FiatUnitSupported {
    return this.unit$$.getValue();
  }

  getSymbol(): string {
    return this.unitSymbol[this.getUnit()];
  }
}
