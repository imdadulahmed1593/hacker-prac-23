var uniqueOccurrences = function (arr) {
  let fc = {};
  for (let elem of arr) {
    fc[elem] = (fc[elem] || 0) + 1;
  }

  let occurences = Object.values(fc);
  //   console.log(fc);
  //   console.log(occurences);

  for (let i = 0; i < occurences.length; i++) {
    if (occurences.slice(i + 1).includes(occurences[i])) return false;
  }
  return true;
};

console.log(uniqueOccurrences([1, 2, 2, 1, 1, 3]));
console.log(uniqueOccurrences([1, 2]));
console.log(uniqueOccurrences([-3, 0, 1, -3, 1, 1, 1, -3, 10, 0]));
