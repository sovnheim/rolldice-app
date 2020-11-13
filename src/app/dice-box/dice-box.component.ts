import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice-box',
  templateUrl: './dice-box.component.html',
  styleUrls: ['./dice-box.component.css']
})

export class DiceBoxComponent implements OnInit {

  diceCommand = ''; // There's probably something better to do here than initialize an empty variable
  validCommand = false;

  // re = new RegExp('(?i)^(?P<dCount>\d+)d(?P<dType>\d+) ?(?P<dMod>[+-]\d+)?$');

  const regex = /^coucou/gm;
  const chaine = 'coucou le monde !';

  const resultat = regex.test(chaine);

  console;.log(resultat); // true

  constructor() { }

  onKey(event: any): void { // without type info
    this.diceCommand = event.target.value;
    console.log('fuck all this and that');
  }

  ngOnInit(): void {
  }
}

