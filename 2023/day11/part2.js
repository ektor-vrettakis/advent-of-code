const fs = require('node:fs');

Array.prototype.transpose = function () {
  return this[0].map((_, index) => this.map(row => row[index]));
};

Array.prototype.filterIndeces = function (callback) {
  return this.reduce((acc, row, index) => callback(row) ? [...acc, index] : acc, []);
};

const expansionFactor = 1000000;

try {
  let grid = fs.readFileSync('./input.txt', 'utf8')
    .split('\n').filter(row => row.trim())
    .map(row => row.split(''));

  const emptyRows = grid
    .filterIndeces(row => row.indexOf('#') < 0);
  const emptyCols = grid.transpose()
    .filterIndeces(row => row.indexOf('#') < 0);

  const galaxies = [];
  for (let y = 0; y < grid.length; ++y)
    for (let x = 0; x <= grid[y].length; ++x)
      if (grid[y][x] === '#') {
        const nCols = emptyCols
          .filter(v => v < x).length * (expansionFactor - 1);
        const nRows = emptyRows
          .filter(v => v < y).length * (expansionFactor - 1);
        galaxies.push({ y: y + nRows, x: x + nCols });
      }

  const manhattan = (g1, g2) =>
    Math.abs(g1.x - g2.x) + Math.abs(g1.y - g2.y);

  const distances = [];
  for (const g1 of galaxies)
    for (const g2 of galaxies)
      distances.push({ g1, g2, dist: manhattan(g1, g2) });
  // g1 <-> g2 is counted twice
  const sum = distances
    .reduce((acc, { dist }) => acc + dist, 0) / 2;
  console.log(sum);
} catch (err) {
  console.error(err);
}
