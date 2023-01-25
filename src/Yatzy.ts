export default class Yatzy {
  private dice: number[];

  constructor(d1: number, d2: number, d3: number, d4: number, d5: number) {
    this.dice = [];
    this.dice[0] = d1;
    this.dice[1] = d2;
    this.dice[2] = d3;
    this.dice[3] = d4;
    this.dice[4] = d5;
  }

  static chance(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    var total = 0;
    total += d1;
    total += d2;
    total += d3;
    total += d4;
    total += d5;
    return total;
  }

  static yatzy(...args: number[]): number {
    var counts = [0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i != args.length; ++i) {
      var die = args[i];
      counts[die - 1]++;
    }
    for (i = 0; i != 6; i++) if (counts[i] == 5) return 50;
    return 0;
  }

  ones(): number {
    return this.numbers(1);
  }

  private numbers(value : number) {
    let sum = 0;
    var i;
    for (i = 0; i < this.dice.length; i++) if (this.dice[i] == value) sum = sum + value;
    return sum;
  }

  twos(): number {
    return this.numbers(2);
  }

  threes(): number {
    return this.numbers(3);
  }

  static score_pair(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    counts[d1 - 1]++;
    counts[d2 - 1]++;
    counts[d3 - 1]++;
    counts[d4 - 1]++;
    counts[d5 - 1]++;
    var at;
    for (at = 0; at != 6; at++) if (counts[6 - at - 1] >= 2) return (6 - at) * 2;
    return 0;
  }

  static two_pair(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    counts[d1 - 1]++;
    counts[d2 - 1]++;
    counts[d3 - 1]++;
    counts[d4 - 1]++;
    counts[d5 - 1]++;
    var n = 0;
    var score = 0;
    for (let i = 0; i < 6; i += 1)
      if (counts[6 - i - 1] >= 2) {
        n++;
        score += 6 - i;
      }
    if (n == 2) return score * 2;
    else return 0;
  }

  static four_of_a_kind(_1: number, _2: number, d3: number, d4: number, d5: number): number {
    var tallies;
    tallies = [0, 0, 0, 0, 0, 0, 0, 0];
    tallies[_1 - 1]++;
    tallies[_2 - 1]++;
    tallies[d3 - 1]++;
    tallies[d4 - 1]++;
    tallies[d5 - 1]++;
    for (let i = 0; i < 6; i++) if (tallies[i] >= 4) return (i + 1) * 4;
    return 0;
  }

  static three_of_a_kind(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    var t;
    t = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    t[d1 - 1]++;
    t[d2 - 1]++;
    t[d3 - 1]++;
    t[d4 - 1]++;
    t[d5 - 1]++;
    for (let i = 0; i < 6; i++) if (t[i] >= 3) return (i + 1) * 3;
    return 0;
  }

  smallStraight(): number {
    const tallies = this.computeTallies();

    if (tallies[0] == 1 && tallies[1] == 1 && tallies[2] == 1 && tallies[3] == 1 && tallies[4] == 1) return 15;
    return 0;
  }

  largeStraight(): number {

    const tallies = this.computeTallies();

    if (tallies[1] == 1 && tallies[2] == 1 && tallies[3] == 1 && tallies[4] == 1 && tallies[5] == 1) return 20;
    return 0;
  }

  fullHouse(): number {
    const tallies = this.computeTallies();

    const __ret = this.findDoubleOrTierces(tallies);

    if (__ret._2 && __ret._3) return __ret._2_at * 2 + __ret._3_at * 3;
    else return 0;
  }

  private findDoubleOrTierces(tallies: number[]) {
    let _2 = false;
    let _2_at = 0;
    let _3 = false;
    let _3_at = 0;

    for (let i = 0; i != 6; i += 1) {
      if (tallies[i] == 2) {
        _2 = true;
        _2_at = i + 1;
      }
      if (tallies[i] == 3) {
        _3 = true;
        _3_at = i + 1;
      }
    }
    return {_2, _2_at, _3, _3_at};
  }

  private computeTallies() {
    const tallies = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i != this.dice.length; ++i) {
      tallies[this.dice[i] - 1]++;
    }
    return tallies;
  }

  fours(): number {
    return this.numbers(4);
  }

  fives(): number {
    return this.numbers(5);
  }

  sixes(): number {
    return this.numbers(6);
  }
}
