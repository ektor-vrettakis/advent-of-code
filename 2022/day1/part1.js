const fs = require('node:fs');

try {
  const data = fs.readFileSync('./input.txt', 'utf8')
    .split('\n')
    .reduce(({ index, ...rest }, value) => ({
      index: value ? index : index + 1,
      ...rest,
      [index]: (rest[index] || 0) + Number(value | 0)
    }), { index: 1 });
  const { index: _, ...sums } = data;
  console.log(Math.max(...Object.values(sums)));
} catch (err) {
  console.error(err);
}
