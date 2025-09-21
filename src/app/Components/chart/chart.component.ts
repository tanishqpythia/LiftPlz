import { Component, Input } from '@angular/core';
import { ApexPlotOptions, ApexTooltip, NgApexchartsModule } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend
} from "ng-apexcharts";

// Define the type for ChartOptions
export type ChartOptions = {
  series: ApexNonAxisChartSeries;  // Series data (numeric values for segments)
  chart: ApexChart;                // Chart specific configurations like type and width
  labels: string[];                // Labels for each segment
  fill: ApexFill;                  // Fill colors and types for the chart
  legend: ApexLegend;              // Legend configuration
  responsive: ApexResponsive[];    // Responsive configurations for different screen sizes
  dataLabels: ApexDataLabels;      // Data labels settings
  tooltip: ApexTooltip;            // Tooltip settings
  plotOptions: ApexPlotOptions;    // Plot options for the chart (like donut size)
};

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'] // Fixed typo from styleUrl to styleUrls
})
export class ChartComponent {
  @Input() chartOption: ChartOptions = {
    
    series: [],
    chart: { type: 'donut', width: 380 },
    responsive: [],
    labels: [],
    fill: { type: 'gradient' },
    legend: { formatter: function (val, opts) { return val + ' - ' + opts.w.globals.series[opts.seriesIndex]; } },
    dataLabels: { enabled: false },
    tooltip: {},
    plotOptions: {}
  };
}

