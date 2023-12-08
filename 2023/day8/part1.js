const fs = require('node:fs');

try {
  const [moves, ...rest] = fs.readFileSync('./input.txt', 'utf8')
    .split('\n').filter(line => line.trim())
  const transitions = rest.reduce((acc, value) => {
    const [key, L, R] = value.match(/[A-Z0-9]+/g);
    return { ...acc, [key]: { L, R } }
  }, {});

  let index = 0;
  let steps = 0;
  for (let state = 'AAA'; state !== 'ZZZ'; ++steps) {
    state = transitions[state][moves[index]];
    index = (index + 1) % moves.length;
  }

  console.log(steps);
} catch (err) {
  console.error(err);
}

