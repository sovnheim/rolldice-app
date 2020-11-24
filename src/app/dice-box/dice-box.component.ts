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

  getRolledSet(rollable: number[]): number[] {
    const rolledSet = [];

    for (const die of rollable) {
      rolledSet.push(Math.floor(Math.random() * die) + 1);
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
}
