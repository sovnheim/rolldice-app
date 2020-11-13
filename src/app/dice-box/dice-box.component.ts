import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice-box',
  templateUrl: './dice-box.component.html',
  styleUrls: ['./dice-box.component.css']
})

export class DiceBoxComponent implements OnInit {

d = new DiceModel();

  constructor() { }

  onKey(event: any): void { // without type info
    // (?i)^(?P<dCount>\d+)d(?P<dType>\d+) ?(?P<dMod>[+-]\d+)?$
    const regex = /^\d+[Dd]\d+ ?(\+\d+)?$/gm; // close enough

    this.d.diceCommand = event.target.value;
    this.d.validCommand = regex.test(this.d.diceCommand);

    console.log(this.d.validCommand);
  }

  ngOnInit(): void {
  }
}

export class DiceModel {

  public diceCommand: string;
  public validCommand: boolean;

  constructor(){
    this.diceCommand = '';
    this.validCommand = false;
  }
}
