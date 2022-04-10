import { Component, Input } from '@angular/core';

/*
    Petit composant réutilisable qui gère juste l'affichage d'un prix,
    et l'évolution en % de celui-ci par rapport à une autre date/un autre prix

    On l'affiche et le rafraichit au survol du graphique
 */

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.scss'],
})
export class PriceCardComponent {
  @Input() date: string = '';
  @Input() price: number = 0;
  @Input() comparisonPrice: number = 0;
  @Input() comparisonDate: string = '';

  constructor() {}

  getTrending(absolute?: boolean): number {
    const trending = (this.price / this.comparisonPrice) * 100 - 100;
    return absolute ? Math.abs(trending) : trending;
  }
}
