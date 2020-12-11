export const outcomesMockUp = [
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

  constructor() {
    this.outcomes = outcomesMockUp; // we'll plug this in later
    const unique = this.outcomes.filter((v, i, a) => a.indexOf(v) === i);
  }
}
