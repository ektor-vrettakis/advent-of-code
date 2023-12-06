const fs = require('node:fs');

try {
  const lines = fs.readFileSync('./input.txt', 'utf8')
    .split('\n');
  for(const line of lines) {
    const characters = line.split('');
    let index;
    for (let i=0; i<characters.length-4 && !index; ++i)
      index = new Set(characters.slice(i, i+4)).size === 4 && (i + 4);
    console.log(index);
  }
} catch (err) {
  console.error(err);
}
