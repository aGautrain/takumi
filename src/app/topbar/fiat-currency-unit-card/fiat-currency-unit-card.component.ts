import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FiatUnitService } from 'src/app/services/fiat-unit.service';

@Component({
  selector: 'app-fiat-currency-unit-card',
  templateUrl: './fiat-currency-unit-card.component.html',
  styleUrls: ['./fiat-currency-unit-card.component.css']
})
export class FiatCurrencyUnitCardComponent implements OnInit {

  selectedUnitFormControl: FormControl = new FormControl();

  constructor(private fiatUnitService: FiatUnitService) { }

  ngOnInit(): void {

    this.selectedUnitFormControl.setValue(this.fiatUnitService.getUnit());

    this.selectedUnitFormControl.valueChanges.subscribe((unit) => {
      this.fiatUnitService.changeUnit(unit);
    });
  }

}
