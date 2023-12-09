const fs = require('node:fs');

Array.prototype.window = function(size = 1) {
  return this.flatMap((_, i) => i > this.length - size ? [] : [this.slice(i, i + size)]);
}

const extrapolate = (seq) => {
  if (seq.every(e => e === seq[0]))
    return seq[0];
  const diffs = seq.window(2)
    .map(([a, b]) => b - a);
  return seq.pop() + extrapolate(diffs);
}

try {
  const seqs = fs.readFileSync('./input.txt', 'utf8')
    .split('\n').filter(line => line.trim())
    .map(s => s.match(/-?\d+/g).map(n => Number(n)));
  const sum = seqs.map(extrapolate)
    .reduce((acc, value) => acc + value, 0);
  console.log(sum);
} catch (err) {
  console.error(err);
}
