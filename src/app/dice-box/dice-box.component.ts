import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice-box',
  templateUrl: './dice-box.component.html',
  styleUrls: ['./dice-box.component.css']
})
export class DiceBoxComponent implements OnInit {

  diceCommand = ''; // There's probably something better to do here than initialize an empty variable

  constructor() { }

  ngOnInit(): void {
  }
}

