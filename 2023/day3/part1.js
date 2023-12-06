const fs = require('node:fs');

Array.prototype.intersection = function (array) {
  return this.filter(e => array.includes(e));
}

const range = (start, end) =>
  Array(end - start).fill(start).map((x, y) => x + y);

try {
  const data = fs.readFileSync('./input.txt', 'utf8')
    .split('\n');
  const numbers = data.map(line =>
    [...line.matchAll(/\d+/g)]
      .map(match => ({
        value: match[0],
        index: match.index,
      }))
  );
  const symbols = data.map(line =>
    [...line.matchAll(/[^.\d]/g)]
      .map(match => match.index)
  );
  let sum = 0;
  for (let line = 0; line < numbers.length; ++line) {
    const adjacentLines = [
      ...(numbers[line - 1] ?? []),
      ...(numbers[line] ?? []),
      ...(numbers[line + 1] ?? [])
    ];
    for (const symbol of symbols[line]) {
      const window = range(symbol - 1, symbol + 2);
      sum += adjacentLines
        .filter(({ index, value }) =>
          range(index, index + value.length).intersection(window).length > 0)
        .reduce((acc, { value }) => acc + Number(value), 0);
    }
  }
  console.log(sum);
} catch (err) {
  console.error(err);
}

