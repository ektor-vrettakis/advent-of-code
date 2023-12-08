const fs = require('node:fs');

const gcd = (a, b) =>
  b ? gcd(b, a % b) : a;
const lcm = (a, b) =>
  Math.abs(a * b) / gcd(a, b);

try {
  const [moves, ...rest] = fs.readFileSync('./input.txt', 'utf8')
    .split('\n').filter(line => line.trim())
  const transitions = rest.reduce((acc, value) => {
    const [key, L, R] = value.match(/[A-Z0-9]+/g);
    return { ...acc, [key]: { L, R } }
  }, {});

  const result = Object.keys(transitions)
    .filter(k => k[2] === 'A')
    .reduce((result, initialState) => {
      let index = 0;
      let steps = 0;
      for (let state = initialState; state[2] !== 'Z'; ++steps) {
        state = transitions[state][moves[index]];
        index = (index + 1) % moves.length;
      }
      return lcm(result, steps);
    }, 1);

  console.log(result);
} catch (err) {
  console.error(err);
}
