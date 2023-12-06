const fs = require('node:fs');

Array.prototype.intersection =
  function (array) { return this.filter(e => array.includes(e)) }

const decode = data => {
  const [key, value] = data.split(':')
  const { id: _ } = /(?:Card\s+)(?<id>\d+)/.exec(key).groups;
  const [ winning, hand ] = value.split('|')
    .map(s => s.split('|'))
    .map(([s]) => s.match(/\d+/g).map(n => Number(n)));
  return Math.max(1 << winning.intersection(hand).length-1, 0);
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
