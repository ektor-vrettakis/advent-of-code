const fs = require('node:fs');

const decode = (acc, data) => {
  const [_, key, value] = data.match(/(?:(Time|Distance)):\s*((?:\d+\s*)+)/);
  return { ...acc, [key.toLowerCase()]: value.match(/\d+/g).map(n => Number(n)) };
}

try {
  const data = fs.readFileSync('./input.txt', 'utf8')
    .split('\n').filter(line => line.trim())
    .reduce(decode, {});

  let product = 1;
  for (let i = 0; i < data.time.length; ++i) {
    const time = data.time[i];
    const distance = data.distance[i];
    let count = 0;
    for (let speed = 1; speed < time; ++speed)
      if (speed * (time - speed) > distance)
        ++count;
    product *= count;
  }

  console.log(product);
} catch (err) {
  console.error(err);
}
