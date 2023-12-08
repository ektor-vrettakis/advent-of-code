const fs = require('node:fs');

const order = '23456789TJQKA'.split('')
  .reduce((acc, value, index) => ({ ...acc, [value]: index }), {});

const countRanks = hand => 
  hand.cards.reduce((acc, value) => ({ ...acc, [value]: (acc[value] | 0) + 1 }), {});

const Pairs = { 
  HighCard: 1,
  OnePair: 2,
  TwoPair: 3, 
  ThreeOfAKind: 4,
  FullHouse: 5,
  FourOfAKing: 6,
  FiveOfAKind: 7
};

const scorePairs = counts => {
  const [pair1, pair2] = Object.values(counts)
    .sort((a, b) => b - a);
  return (
    pair1 === 5 ? Pairs.FiveOfAKind :
    pair1 === 4 ? Pairs.FourOfAKing :
    pair1 === 3 ? (pair2 === 2 ? Pairs.FullHouse : Pairs.ThreeOfAKind) :
    pair1 === 2 ? (pair2 === 2 ? Pairs.TwoPair : Pairs.OnePair) : Pairs.HighCard
  );
}

const compareHands = (h1, h2) => {
  const [score1, score2] =
    [h1, h2].map(countRanks).map(scorePairs);
  if (score1 !== score2)
    return score1 - score2;
  // same rank
  for (let i = 0; i < 5; ++i)
    if (h1.cards[i] !== h2.cards[i])
      return order[h1.cards[i]] - order[h2.cards[i]];
  // same pair
  return 0;
}

try {
  const data = fs.readFileSync('./input.txt', 'utf8')
    .split('\n').filter(line => line.trim())
    .map(line => {
      const { hand, bid } = /(?<hand>\w+)\s(?<bid>\d+)/.exec(line).groups;
      return { hand, bid, cards: hand.split('') };
    })
    .sort(compareHands);
  const sum = data.reduce((acc, value, index) =>
    acc + Number(value.bid) * (index + 1)
  , 0);
  console.log(sum);
} catch (err) {
  console.error(err);
}