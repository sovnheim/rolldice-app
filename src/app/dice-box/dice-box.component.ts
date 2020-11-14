import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

const VALIDINPUT = /^(?<dCount>\d+)[Dd](?<dType>\d+) ?(?<dMod>\+\d+)?$/gm;

@Component({
  selector: 'app-dice-box',
  templateUrl: './dice-box.component.html',
  styleUrls: ['./dice-box.component.css']
})

export class DiceBoxComponent implements OnInit {

  d: DiceModel;

  constructor() {
    this.d = new DiceModel();
  }

  onKey(event: any): void {
    if (/^\w$/gm.test(event.key)) {
      this.d.validCommand = VALIDINPUT.test(this.d.diceCommand);
    }
  }

  ngOnInit(): void {
  }
}

export class DiceModel {

  diceCommand: string;
  validCommand: boolean;

constructor(){
    this.diceCommand = '';
    this.validCommand = false;
  }

}
