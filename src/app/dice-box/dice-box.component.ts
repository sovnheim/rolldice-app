import { Component } from '@angular/core';
import { DiceModel, DICE_COMMAND_REGEX } from '../shared/dice.model';

@Component({
  selector: 'app-dice-box',
  templateUrl: './dice-box.component.html',
  styleUrls: ['./dice-box.component.css'],
})
export class DiceBoxComponent {
  d: DiceModel;
  rollStatus: string;

  constructor() {
    this.d = new DiceModel();
    this.rollStatus = 'Roll';
  }

  // Bar chart stuff
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  public barChartLabels = ['1', '2', '3', '4', '5', '6'];

  public barChartType = 'bar';

  public barChartLegend = false;

  public barChartData = [{ data: [1, 1, 1, 1, 1, 1], label: 'Distribution' }];
  // end of bar chart stuff

  onClick(): void {
    this.validateDiceRequest();
  }

  onKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.validateDiceRequest();
    }
  }

  validateDiceRequest(): void {
    this.d.validCommand = DICE_COMMAND_REGEX.test(this.d.diceCommand);
    if (this.d.validCommand) {
      this.rollStatus = 'Re-Roll';
      this.d.executeDiceRoll();
    }
  }
}
