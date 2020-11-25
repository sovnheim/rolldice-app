import { Component, OnInit } from '@angular/core';

const DICE_COMMAND_REGEX = /^(?<dCount>\d+)[Dd](?<dType>\d+) ?(?<dMod>[+-]\d+)?$/;

@Component({
  selector: 'app-dice-box',
  templateUrl: './dice-box.component.html',
  styleUrls: ['./dice-box.component.css']
})

export class DiceBoxComponent implements OnInit {

  d: DiceModel;
  rollStatus: string;

  constructor() {
    this.d = new DiceModel();
    this.rollStatus = 'Roll';
  }

  onClick(event: any): void {
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

  ngOnInit(): void {}
}

export class DiceModel {

  constructor(){
      this.diceCommand = '';
      this.validCommand = false;
    }

  diceCommand: string;
  validCommand: boolean;
  rollableSet: number[];
  rolledSet: number[];
  modifiers: number[];
  result: number;
  stats: {
    min: number,
    max: number,
    average: number,
    halved: number;
  };

  parseDiceCommand(): void {
    const parsedSet = DICE_COMMAND_REGEX.exec(this.diceCommand);

    this.rollableSet = [];
    this.modifiers = [];

    for (let i = 0; i < Number(parsedSet.groups.dCount); i++) {
      this.rollableSet.push(Number(parsedSet.groups.dType));
    }

    if (parsedSet.groups.dMod){
      this.modifiers.push(Number(parsedSet.groups.dMod));
    }
  }

  rollDie(die: number): number {
    return Math.floor(Math.random() * die) + 1;
  }

  diceAverage(rollableDice: number[]): number {
    const result = [];
    for (const die of rollableDice) {
      result.push((die + 1) / 2);
    }
    return result.reduce((a, b) => a + b, 0);
  }

  getRolledSet(rollable: number[]): number[] {
    const rolledSet = [];

    for (const die of rollable) {
      rolledSet.push(this.rollDie(die));
    }
    return rolledSet;
  }

  updateResult(): void {
    this.result = this.rolledSet.reduce((a, b) => a + b, 0);
    if (this.modifiers){
      this.result += this.modifiers.reduce((a, b) => a + b, 0);
    }
  }

  executeDiceRoll(): void {
    this.parseDiceCommand();
    this.rolledSet = this.getRolledSet(this.rollableSet);
    this.updateResult();
    this.runBasicStats();
    // console.log(this.calculateDistribution(this.rollableSet));
  }

  formatModifiers(mods: number[]): string {
    const formattedMods = [];
    for (const mod of mods) {
      if (mod < 0) {
        formattedMods.push(mod.toString());
      }
      else if (mod > 0) {
        formattedMods.push('+' + mod.toString());
      }
    }
    return formattedMods.join(' ');

  }

  getVerboseResult(): string {
    if (this.modifiers.length > 0) {
      return this.rolledSet.join('+') + ' (' + this.formatModifiers(this.modifiers) + ') = ' + this.result.toString() ;
    }
    else {
      return this.rolledSet.join('+') + ' = ' + this.result.toString() ;
    }
  }

  runBasicStats(): void {
    this.stats = {
      min: this.rollableSet.length + this.modifiers.reduce((a, b) => a + b, 0),
      max: this.rollableSet.reduce((a, b) => a + b, 0),
      average: this.diceAverage(this.rollableSet) + this.modifiers.reduce((a, b) => a + b, 0),
      halved: this.result / 2
    };
  }

  calculateDistribution(rollableSet: number[]): number[] {
    const generator = [];

    for (const dice of rollableSet) {
      generator.push(Array.from({ length: dice }, (x, i) => i + 1));
    }

    const cartesian = (...a) =>
      // tslint:disable-next-line: no-shadowed-variable
      a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

    const output = [];

    for (const outcome of cartesian(...generator)) {
      output.push(outcome.reduce((a, b) => a + b, 0));
    }
    return output;
  }
}
