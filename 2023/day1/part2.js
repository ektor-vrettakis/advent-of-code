const fs = require('node:fs');

const transform = data => {
  const colors = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 };
  const regex = new RegExp(Object.keys(colors).join('|'), 'gi');
  return data.replace(regex, key => colors[key]);
};

const decode = data => {
  const tokens = data.split('').filter(c => /\d/.test(c));
  return [tokens[0], tokens.slice(-1)].join('') | 0;
};

try {
  const data = fs.readFileSync('./input.txt', 'utf8')
    .split('\n').filter(line => line.trim());
  const sum = data.map(transform).map(decode)
    .reduce((acc, value) => acc + value, 0);
  console.log(sum);
} catch (err) {
  console.error(err);
}
