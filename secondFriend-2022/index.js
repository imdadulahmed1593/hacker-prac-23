function secondFriend(r, c, image) {
  if (r === 1 || c === 1) {
    if (image.flat(Infinity).indexOf('^') === -1) return ['Possible', image];
    return 'Impossible';
  }

  const result = image.map((r) => r.map((d) => (d = '^')));
  return ['Possible', result];
}

console.log(
  secondFriend(4, 4, [
    ['.', '.', '^', '.'],
    ['.', '.', '^', '.'],
    ['.', '.', '.', '.'],
    ['.', '.', '.', '^'],
  ])
);
