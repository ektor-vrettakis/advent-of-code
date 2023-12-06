const fs = require('node:fs');

try {
  const data = fs.readFileSync('./input.txt', 'utf8')
    .split('\n');

  const sum = data.map(line => {
    const mid = Math.floor(line.length / 2);
    const [firstPart, secondPart] =
      [line.slice(0, mid), line.slice(mid)];
    return [...firstPart]
      .filter(item => [...secondPart].includes(item))[0];
  })
    .reduce((acc, value) => {
      // Lowercase item types a through z have priorities 1 through 26.
      // Uppercase item types A through Z have priorities 27 through 52.
      const code = value.charCodeAt(0);
      const score = code - (code >= 97 && code <= 122 ? 96 : 38);
      return acc + score;
    }, 0);
  console.log(sum);
} catch (err) {
  console.error(err);
}
