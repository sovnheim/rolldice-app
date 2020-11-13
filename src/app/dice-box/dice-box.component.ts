import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice-box',
  templateUrl: './dice-box.component.html',
  styleUrls: ['./dice-box.component.css']
})

export class DiceBoxComponent implements OnInit {

  diceCommand = '';
  validCommand = false;




  constructor() { }

  onKey(event: any): void { // without type info
    this.diceCommand = event.target.value;
    // (?i)^(?P<dCount>\d+)d(?P<dType>\d+) ?(?P<dMod>[+-]\d+)?$
    const regex = /^\d+[Dd]\d+ ?(\+\d+)?$/gm; // close enough
    const resultat = regex.test(event.target.value);

    console.log(resultat);
  }

  ngOnInit(): void {

  }
}
