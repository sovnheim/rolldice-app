const OUTCOMES_MOCKUP = [
  2,
  3,
  4,
  5,
  6,
  7,
  3,
  4,
  5,
  6,
  7,
  8,
  4,
  5,
  6,
  7,
  8,
  9,
  5,
  6,
  7,
  8,
  9,
  10,
  6,
  7,
  8,
  9,
  10,
  11,
  7,
  8,
  9,
  10,
  11,
  12,
];

export class DistributionModel {
  outcomes: number[];
  unique: number[];

  barChartLabels: string[];
  barChartType: string;
  barChartLegend: boolean;
  barChartData: unknown[];

  constructor() {
    this.barChartLabels = ['1', '2', '3', '4', '5', '6'];
    this.barChartType = 'bar';
    this.barChartLegend = false;
    this.barChartData = [{ data: [1, 2, 3, 3, 2, 1], label: 'Distribution' }];

    this.outcomes = OUTCOMES_MOCKUP; // we'll plug this in later
    this.unique = this.outcomes.filter((v, i, a) => a.indexOf(v) === i);
  }
}
