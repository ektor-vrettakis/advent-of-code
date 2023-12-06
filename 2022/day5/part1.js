const fs = require('node:fs');

function transpose(array) {
  return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}

try {
  const lines = fs.readFileSync('./input.txt', 'utf8')
    .split('\n');

  const array = [];
  let i;
  for (i = 0; lines[i]; ++i) {
    const line = lines[i];
    const tokens = [];
    for (let j = 0; j < line.length; j += 4)
      tokens.push(line.slice(j, j + 4).replace(/[^\w]/g, ''));
    array.push(tokens);
  }

  const stacks = transpose(array).reduce((acc, c) => {
    const [stack, ...crates] = c.reverse().filter(v => v)
    return { ...acc, [stack]: crates };
  }, {});

  for (++i; i < lines.length; ++i) {
    const [move, from, to] =
      lines[i].match(/\d+/g).map(Number);
    const crates = stacks[from].splice(stacks[from].length - move, move);
    stacks[to].push(...crates.reverse())
  }
  const message = Object.values(stacks)
    .map(stack => stack.pop()).join('');
  console.log(message);
} catch (err) {
  console.error(err);
}
