const fs = require('node:fs');

const decode = data => {
  const [key, value] = data.split(':')
  const { id } = /(?:Game\s)(?<id>\d+)/.exec(key).groups;
  const games = value.split(';').map(game =>
    game.split(',').map(pair => /\s(?<count>\d+)\s(?<color>\w+)/.exec(pair).groups)
  );
  return { id, games };
}

const power = ({ games }) => {
  const min = { red: 0, green: 0, blue: 0 };
  for (const game of games)
    for (const { count, color } of game)
      min[color] = Math.max(min[color], count);
  return Object.values(min).reduce((acc, value) => acc * value, 1);
}

try {
  const data = fs.readFileSync('./input.txt', 'utf8')
    .split('\n').filter(line => line.trim());
  const sum = data.map(decode).map(power)
    .reduce((acc, value) => acc + value, 0);
  console.log(sum);
} catch (err) {
  console.error(err);
}
