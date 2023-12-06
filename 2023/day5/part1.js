const fs = require('node:fs');

try {
  const lines = fs.readFileSync('./input.txt', 'utf8')
    .split('\n').filter(line => line.trim());

  let seeds;
  let state;
  const transitions = {};
  for (const line of lines) {
    if (/seeds:\s([\d\s]+)/.test(line)) {
      seeds = line.match(/\d+/g).map(n => Number(n));
    } else if (/([\w-]+)\smap:/.test(line)) {
      state = line.match(/([\w-]+)\smap:/)[1];
      transitions[state] = new Map();
    } else if (state) {
      [dest, src, length] = line.match(/\d+/g).map(n => Number(n));
      transitions[state].set({ start: src, end: src + length }, { start: dest, end: dest + length });
    }
  }

  const includes = ({ start, end }, value) =>
    start <= value && value <= end;
  let minLocation;

  for (const seed of seeds) {
    let value = seed;
    // console.log('seed', value);
    for (const transitionName of Object.keys(transitions)) {
      const transition = transitions[transitionName];
      const transitionKey = [...transition.keys()]
        .find(range => includes(range, value));
      let transitionValue;
      if (transitionKey) {
        transitionValue = transition.get(transitionKey);
        value += transitionValue.start - transitionKey.start;
      }
      // console.log(transitionName, transitionKey || 'identity', transitionValue || 'identity', value);
    }
    minLocation = Math.min(minLocation || Number.MAX_VALUE, value);
  }

  console.log(minLocation);
} catch (err) {
  console.error(err);
}
