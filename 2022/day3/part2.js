const fs = require('node:fs');
const readline = require('node:readline');

const readInterface = readline.createInterface({
  input: fs.createReadStream('./input.txt'),
  output: process.stdout,
  terminal: false
});

const intersection3 = ([a, b, c]) =>
  [...a]
    .filter(item => [...b].includes(item))
    .filter(item => [...c].includes(item));

let score = 0;

let buffer = [];
readInterface.on('line', line => {
  buffer.push(line);
  if (buffer.length === 3) {
    const code = intersection3(buffer)[0].charCodeAt(0);
    score += code - (code >= 97 && code <= 122 ? 96 : 38);
    buffer = [];
  }
});

readInterface.on('close', () => {
  console.log(score);
});
