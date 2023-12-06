const fs = require('node:fs');

Array.prototype.intersection =
  function (array) { return this.filter(e => array.includes(e)) }

const decode = data => {
  const [key, value] = data.split(':')
  const { id } = /(?:Card\s+)(?<id>\d+)/.exec(key).groups;
  const [ winning, hand ] = value.split('|')
    .map(s => s.split('|'))
    .map(([s]) => s.match(/\d+/g).map(n => Number(n)));
  return { 
    index: Number(id) - 1,
    score: winning.intersection(hand).length
  };
}

try {
  const data = fs.readFileSync('./input.txt', 'utf8')
    .split('\n').filter(line => line.trim());

  const stack = data.map(decode);
  for(let i = 0; i < stack.length; ++i) {
    const { index, score } = stack[i];
    stack.push(...stack.slice(index + 1, index + 1 + score))
  }
  console.log(stack.length);
} catch (err) {
  console.error(err);
}
