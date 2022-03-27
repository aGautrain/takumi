import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.css']
})
export class PriceCardComponent implements OnInit {

  @Input() price: number = 0;
  @Input() comparisonPrice: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  getTrending(absolute?: boolean): number {
    const trending = this.price / this.comparisonPrice * 100 - 100;
    return absolute ? Math.abs(trending) : trending;
  }

}
