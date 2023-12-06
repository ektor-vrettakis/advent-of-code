const fs = require('node:fs');

const decode = data => {
  const [key, value] = data.split(':')
  const { id } = /(?:Game\s)(?<id>\d+)/.exec(key).groups;
  const games = value.split(';').map(game =>
    game.split(',').map(pair => /\s(?<count>\d+)\s(?<color>\w+)/.exec(pair).groups)
  );
  return { id, games };
}

const possible = ({ games }) => {
  const max = { red: 12, green: 13, blue: 14 };
  return games.every(game =>
    game.every(({ count, color }) => Number(count) <= max[color])
  );
}

try {
  const data = fs.readFileSync('./input.txt', 'utf8')
    .split('\n').filter(line => line.trim());
  const sum = data.map(decode).filter(possible)
    .reduce((acc, { id }) => acc + Number(id), 0);
  console.log(sum);
} catch (err) {
  console.error(err);
}
