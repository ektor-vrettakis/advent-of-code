const fs = require('node:fs');

const draw = (filteredGrid) => {
  const dashes = match => '─'.repeat(match.length - 2);
  console.log(
    filteredGrid.map(row => row
      .replace(/(S|F)-*7/g, match => '╭' + dashes(match) + '╮')
      .replace(/(S|L)-*J/g, match => '╰' + dashes(match) + '╯')
      .replace(/(S|F)-*J/g, match => '╭' + dashes(match) + '╯')
      .replace(/(S|L)-*7/g, match => '╰' + dashes(match) + '╮')
      .replace(/\|/g, '│')
      .replace(/[F7LJ\.]/g, match =>
        ({ 'F': '╭', '7': '╮', 'L': '╰', 'J': '╯', '.': ' ' }[match]))
    ).join('\n')
  );
}

try {
  const grid = fs.readFileSync('./input.txt', 'utf8')
    .split('\n').filter(row => row.trim())

  const S = grid.reduce((acc, row, y) => {
    const x = row.indexOf('S');
    return x !== -1 ? { y, x } : acc;
  }, {});

  const findMoves = ({ y, x }) => {
    const moves = [];
    if (y !== 0 && ['L', 'J', '|', 'S'].includes(grid[y][x]) && ['7', 'F', '|'].includes(grid[y - 1][x]))
      moves.push({ y: y - 1, x });
    if (y + 1 !== grid.length && ['F', '7', '|', 'S'].includes(grid[y][x]) && ['J', 'L', '|'].includes(grid[y + 1][x]))
      moves.push({ y: y + 1, x });
    if (x !== 0 && ['J', '7', '-', 'S'].includes(grid[y][x]) && ['F', 'L', '-'].includes(grid[y][x - 1]))
      moves.push({ y, x: x - 1 });
    if (x + 1 !== grid[y].length && ['7', 'J', '-'].includes(grid[y][x + 1]) && ['F', 'L', '-', 'S'].includes(grid[y][x]))
      moves.push({ y, x: x + 1 });

    return moves;
  }

  let steps = 0;
  let moves = [S];
  const visited = [S];
  while (true) {
    const possibleMoves =
      moves.flatMap(findMoves);
    const notVisited = possibleMoves
      .filter(m => !visited.some(v => v.y === m.y && v.x === m.x))
    if (!notVisited.length)
      break;
    ++steps;
    visited.push(...notVisited);
    moves = notVisited;
  }

  const filteredGrid = grid.map((row, y) => row.split('').map((col, x) =>
    !visited.some(v => v.y === y && v.x === x) ? '.' : col
  ).join(''));

  const transformedGrid = filteredGrid.map(row => row
    .replace(/(S|F)-*7/g, match => '|' + '-'.repeat(match.length - 2) + '|')
    .replace(/(S|L)-*J/g, match => '|' + '-'.repeat(match.length - 2) + '|')
    .replace(/(S|F)-*J/g, match => '|' + '-'.repeat(match.length - 1))
    .replace(/(S|L)-*7/g, match => '-'.repeat(match.length - 1) + '|')
    .replace(/[FJL7]/g, '.')
  );

  // ray casting
  let pips = [];
  for (let y = 0; y < transformedGrid.length; ++y) {
    let crossings = 0;
    for (let x = 0; x < transformedGrid[y].length; ++x) {
      if (transformedGrid[y][x] === '|')
        ++crossings;
      else if ((crossings % 2) === 1 && transformedGrid[y][x] === '.') {
        pips.push({ y, x });
      }
    }
  }
  const gridWithPips = filteredGrid.map((row, y) => row.split('').map((col, x) =>
    !pips.some(v => v.y === y && v.x === x) ? col : '\x1b[34m★\x1b[0m'
  ).join(''));

  draw(gridWithPips);
  console.log({ steps, points: pips.length });
} catch (err) {
  console.error(err);
}
