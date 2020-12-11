const DICE_COMMAND_REGEX = /^(?<dCount>\d+)[Dd](?<dType>\d+) ?(?<dMod>[+-]\d+)?$/;

export default class DiceModel {
  constructor() {
    this.diceCommand = '';
    this.validCommand = false;
  }

    diceCommand: string;

    validCommand: boolean;

    rollableSet: number[];

    rolledSet: number[];

    modifiers: number[];

    result: number;

    allPossibleResults: number[];

    stats: {
        min: number;
        max: number;
        average: number;
        halved: number;
    };

    parseDiceCommand(): void {
      const parsedSet = new RegExp(DICE_COMMAND_REGEX).exec(this.diceCommand);

      this.rollableSet = [];
      this.modifiers = [];

      for (let i = 0; i < Number(parsedSet.groups.dCount); i += 1) {
        this.rollableSet.push(Number(parsedSet.groups.dType));
      }

      if (parsedSet.groups.dMod) {
        this.modifiers.push(Number(parsedSet.groups.dMod));
      }
    }

    static rollDie(die: number): number {
      return Math.floor(Math.random() * die) + 1;
    }

    static diceAverage(rollableDice: number[]): number {
      return rollableDice.map((die) => (die + 1) / 2).reduce((a, b) => a + b, 0);
    }

    static getRolledSet(rollable: number[]): number[] {
      return rollable.map((die) => DiceModel.rollDie(die));
    }

    updateResult(): void {
      this.result = this.rolledSet.reduce((a, b) => a + b, 0);
      if (this.modifiers) {
        this.result += this.modifiers.reduce((a, b) => a + b, 0);
      }
    }

    executeDiceRoll(): void {
      this.parseDiceCommand();
      this.rolledSet = DiceModel.getRolledSet(this.rollableSet);
      this.updateResult();
      this.runBasicStats();

      // setting a limit on dist calculation for now
      if (this.rollableSet.length < 15) {
        this.calculateDistribution(this.rollableSet);
      }
    }

    static formatModifiers(mods: number[]): string {
      const formattedMods = [];
      mods.forEach((mod) => {
        if (mod < 0) {
          formattedMods.push(mod.toString());
        } else if (mod > 0) {
          formattedMods.push(`+${mod.toString()}`);
        }
      });
      return formattedMods.join(' ');
    }

    getVerboseResult(): string {
      if (this.modifiers.length > 0) {
        return `${this.rolledSet.join('+')} (${DiceModel.formatModifiers(this.modifiers)}) = ${this.result.toString()}`;
      }

      return `${this.rolledSet.join('+')} = ${this.result.toString()}`;
    }

    runBasicStats(): void {
      this.stats = {
        min: this.rollableSet.length + this.modifiers.reduce((a, b) => a + b, 0),
        max: this.rollableSet.reduce((a, b) => a + b, 0),
        average:
          DiceModel.diceAverage(this.rollableSet) + this.modifiers.reduce((a, b) => a + b, 0),
        halved: this.result / 2,
      };
    }

    calculateDistribution(rollableSet: number[]): void {
      const generator = [];

      rollableSet.forEach((dice) => {
        generator.push(Array.from({ length: dice }, (x, i) => i + 1));
      });

      const cartesian = (...x) => x.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

      const output = cartesian(...generator).map((outcome) => outcome.reduce((a, b) => a + b, 0));

      this.allPossibleResults = output;
    }
}
