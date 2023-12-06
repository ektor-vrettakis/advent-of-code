const fs = require('node:fs');

const decode = (acc, data) => {
  const [_, key, value] = data.match(/(?:(Time|Distance)):\s*((?:\d+\s*)+)/);
  return { ...acc, [key.toLowerCase()]: Number(value.replace(/\s/g, '')) };
}

try {
  const data = fs.readFileSync('./input.txt', 'utf8')
    .split('\n').filter(line => line.trim())
    .reduce(decode, {});

  const { time, distance } = data;
  let count = 0;
  for (let speed = 0; speed < time; ++speed)
    if (speed * (time - speed) > distance)
      ++count;

  console.log(count);
} catch (err) {
  console.error(err);
}
