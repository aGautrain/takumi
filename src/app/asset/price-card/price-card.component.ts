import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.scss']
})
export class PriceCardComponent {

  @Input() date: string = '';
  @Input() price: number = 0;
  @Input() comparisonPrice: number = 0;
  @Input() comparisonDate: string = '';

  constructor() { }

  getTrending(absolute?: boolean): number {
    const trending = this.price / this.comparisonPrice * 100 - 100;
    return absolute ? Math.abs(trending) : trending;
  }

}
