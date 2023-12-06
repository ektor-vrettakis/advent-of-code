const fs = require('node:fs');

const decode = data => {
  const tokens = data.split('').filter(c => /\d/.test(c));
  return [tokens[0], tokens.slice(-1)].join('') | 0;
}

try {
  const data = fs.readFileSync('./input.txt', 'utf8')
    .split('\n').filter(line => line.trim());
  const sum = data.map(decode)
    .reduce((acc, value) => acc + value, 0);
  console.log(sum);
} catch (err) {
  console.error(err);
}
