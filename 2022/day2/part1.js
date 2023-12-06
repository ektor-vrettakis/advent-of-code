const fs = require('node:fs');

try {
  const data = fs.readFileSync('./input.txt', 'utf8')
    .split('\n');
  const scores = data.map(round => {
    const [move, response] = round.split(' ');
    return { 'X': 1, 'Y': 2, 'Z': 3 }[response] + (
      // Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock
      (move === 'A' && response === 'X') || (move === 'B' && response === 'Y') || (move === 'C' && response === 'Z') ? 3 :
      (move === 'C' && response === 'X') || (move === 'B' && response === 'Z') || (move === 'A' && response === 'Y') ? 6 : 0
    );
  });
  const total = scores.reduce((sum, value) => sum + value);
  console.log(total);
} catch (err) {
  console.error(err);
}
