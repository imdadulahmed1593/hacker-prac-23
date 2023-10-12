const secondHands = (n, k, arr) => {
  if (k * 2 < n) return 'NO';
  let fc = {};
  for (let elem of arr) {
    fc[elem] = (fc[elem] || 0) + 1;
  }

  if (Object.keys(fc).length > k * 2) return 'NO';
  for (let key in fc) {
    if (fc[key] > 2) return 'NO';
  }
  return 'YES';
};

// console.log(secondHands(3, 2, [1, 2, 2]));
console.log(secondHands(5, 3, [7, 1, 5, 7, 4]));
// console.log(secondHands(5, 2, [1, 2, 3, 4, 5]));
// console.log(secondHands(5, 5, [1, 1, 2, 2, 1]));
// console.log(secondHands(1, 1, [1]));
// // 5 3
// 7 1 5 7 4
