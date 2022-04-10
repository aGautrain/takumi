import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Chart, Plugin, registerables } from 'chart.js';
Chart.register(...registerables);

/*
  Composant qui affiche un graphique à l'aide de la librairie Chart.js
  https://www.chartjs.org/
  https://www.chartjs.org/docs/latest/samples/line/line.html

  Customise l'affichage
 */

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input() title: string = '';
  @Input() labels: string[] = [];
  @Input() data: number[] = [];

  @Output() focused: EventEmitter<[string, number]> = new EventEmitter<
    [string, number]
  >();

  chartInstance: Chart | undefined;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['title'].currentValue &&
      changes['labels']?.currentValue?.length &&
      changes['data']?.currentValue?.length
    ) {
      this.initializeChartWith(
        changes['labels'].currentValue,
        changes['data'].currentValue,
        changes['title'].currentValue
      );
    }
  }

  initializeChartWith(labels: string[], data: number[], title?: string) {
    if (!this.chartInstance) {
      // pas de graphique, on va le créer

      // on récupère le canvas
      const ctx = (
        document?.getElementById('myChart') as HTMLCanvasElement
      ).getContext('2d');

      if (ctx) {
        // on créé un plugin pour pouvoir récupérer l'information du point survolé
        // ce qui nous permet d'afficher le prix ailleurs dans l'application, cf PriceCardComponent dans AssetComponent
        const myPlugin: Plugin = {
          id: 'customPlugin',
          beforeEvent: (chart: Chart) => {
            const tooltip = chart?.tooltip?.dataPoints?.length
              ? chart.tooltip.dataPoints[0]
              : null;
            if (tooltip) {
              const label: string = tooltip.label;
              const raw: number = tooltip.raw as number;
              if (label && raw) this.focused.emit([label, raw]);
            }
          },
        };

        // c'est ici qu'on définit ce que contient le graphique à savoir des dates en abscisse et des prix en ordonnée
        this.chartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: title || this.title,
                data: data,
                fill: true,
                backgroundColor: 'rgba(28,199,96, .1)',
                pointBackgroundColor: 'rgb(28,199,96)',
                pointHitRadius: 5,
                tension: 0,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                intersect: false,
              },
            },
          },
          plugins: [myPlugin],
        });
      }
    } else {
      // si on a déjà un graphique de créé mais qu'on change de crypto, on rafraichit le contenu du graphique
      // sans avoir à tout recréer
      this.chartInstance.data.labels = [...labels];
      this.chartInstance.data.datasets = [
        {
          label: title || this.title,
          data: data,
          fill: false,
          backgroundColor: 'rgb(28,199,96)',
          tension: 0,
        },
      ];
      this.chartInstance.update();
    }
  }
}
