import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Chart, Plugin, registerables } from 'chart.js';
Chart.register(...registerables);




@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartComponent implements OnInit, OnChanges {


  @Input() title: string = '';
  @Input() labels: string[] = [];
  @Input() data: number[] = [];

  @Output() focused: EventEmitter<[string, number]> = new EventEmitter<[string, number]>();

  chartInstance: Chart | undefined;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['title'].currentValue && changes['labels']?.currentValue?.length && changes['data']?.currentValue?.length) {
      this.initializeChartWith(changes['labels'].currentValue, changes['data'].currentValue, changes['title'].currentValue);
    }
  }

  initializeChartWith(labels: string[], data: number[], title?: string) {
    if (!this.chartInstance) {
      const ctx = (document?.getElementById('myChart') as HTMLCanvasElement).getContext('2d');

      if (ctx) {

        const myPlugin: Plugin = {
          id: 'customPlugin',
          beforeEvent: (chart: Chart) => {
            const tooltip = chart?.tooltip?.dataPoints?.length ? chart.tooltip.dataPoints[0] : null;
            if (tooltip) {
              const label: string = tooltip.label;
              const raw: number = tooltip.raw as number;
              if (label && raw) this.focused.emit([label, raw]);
            }
          }
        };


        this.chartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: title || this.title,
              data: data,
              fill: true,
              backgroundColor: 'rgba(28,199,96, .1)',
              pointBackgroundColor: 'rgb(28,199,96)',
              pointHitRadius: 5,
              tension: 0
            }]
          },
          options: {
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                intersect: false
              }
            }
          },
          plugins: [myPlugin]
        });
      }
    } else {
      this.chartInstance.data.labels = [...labels];
      this.chartInstance.data.datasets = [{
        label: title || this.title,
        data: data,
        fill: false,
        backgroundColor: 'rgb(28,199,96)',
        tension: 0
      }];
      this.chartInstance.update();
    }
  }

}
