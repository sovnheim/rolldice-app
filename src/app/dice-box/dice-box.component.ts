import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice-box',
  templateUrl: './dice-box.component.html',
  styleUrls: ['./dice-box.component.css']
})
export class DiceBoxComponent implements OnInit {

  diceCommand = '2D6';

  constructor() { }

  ngOnInit(): void {
  }
}

