import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

const DICE_COMMAND_REGEX = /^(?<dCount>\d+)[Dd](?<dType>\d+) ?(?<dMod>\+\d+)?$/;

@Component({
  selector: 'app-dice-box',
  templateUrl: './dice-box.component.html',
  styleUrls: ['./dice-box.component.css']
})

export class DiceBoxComponent implements OnInit {

  d: DiceModel;
  seconds: number; // rxjs

  constructor() {
    this.d = new DiceModel();
  }

  onKey(event: any): void {
    if (/^\w$/gm.test(event.key)) {
      this.d.validCommand = DICE_COMMAND_REGEX.test(this.d.diceCommand);
      if (this.d.validCommand) {
        this.d.rollableSet = this.parseDiceCommand(this.d.diceCommand);
        this.d.rolledSet = this.getDiceResults(this.d.rollableSet);
        this.d.updateResult();
      }
    }
  }

  ngOnInit(): void {
    const counter = interval(1000); // rxjs
    counter.subscribe(
      value => { this.seconds = value; }
    );
  }

  parseDiceCommand(diceCommand: string): number[] {
    const parsedSet = DICE_COMMAND_REGEX.exec(diceCommand);
    const rollableSet: number[] = [];

    for (let i = 0; i < Number(parsedSet.groups.dCount); i++) {
      rollableSet.push(Number(parsedSet.groups.dType));
    }
    return rollableSet;
  }

  getDiceResults(rollable: number[]): number[] {
    const result = [];

    for (const die of rollable) {
      result.push(Math.floor(Math.random() * die) + 1);
    }
    return result;
  }
}

export class DiceModel {

  diceCommand: string;
  validCommand: boolean;
  rollableSet: number[];
  rolledSet: number[];
  modifiers: number[];
  result: number;

  constructor(){
      this.diceCommand = '';
      this.validCommand = false;
    }

  updateResult(): void {
    this.result = this.rolledSet.reduce((a, b) => a + b, 0);
    if (this.modifiers){
      this.result += this.modifiers.reduce((a, b) => a + b, 0);
    }
  }
}
