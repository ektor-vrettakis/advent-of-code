const fs = require('node:fs');

try {
  // AX: rock, BY: paper, CZ: scissors
  const data = fs.readFileSync('./input.txt', 'utf8').split('\n');
  const scores = data.map(round => {
    // X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win.
    const [move, outcome] = round.split(' ');
    return { 'X': 0, 'Y': 3, 'Z': 6 }[outcome] + (
      // Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock.
      outcome === 'X' ? (move === 'A' ? 3 : move === 'B' ? 1 : 2) : // lose
      outcome === 'Y' ? { 'A': 1, 'B': 2, 'C': 3 }[move] :  // draw
        (move === 'A' ? 2 : move === 'B' ? 3 : 1) // win
    );
  });
  const total = scores.reduce((sum, value) => sum + value);
  console.log(total);
} catch (err) {
  console.error(err);
}
