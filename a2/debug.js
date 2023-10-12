const solve = function (a, b, c) {
  // solution
  //   const { a, b, c } = this.data;
  if (c < a && c < b) return 0;
  let maxPatty;
  let maxbun;
  let noOfSingles = Math.floor(c / a);
  let noOfDoubles = Math.floor(c / b);
  if (c % b !== 0 && (c % b) % a === 0) {
    maxPatty = Math.max(noOfSingles, noOfDoubles * 2 + (c % b) / a);
    maxbun = Math.max(noOfSingles * 2, (noOfDoubles + (c % b) / a) * 2);
  } else if (c % a !== 0 && (c % a) % b === 0) {
    maxPatty = Math.max(noOfDoubles * 2, noOfSingles + ((c % a) / b) * 2);
    maxbun = Math.max(noOfDoubles * 2, noOfSingles * 2 + ((c % a) / b) * 2);
  } else {
    maxPatty = Math.max(noOfSingles, noOfDoubles * 2);
    maxbun = noOfSingles > noOfDoubles * 2 ? noOfSingles * 2 : noOfDoubles * 2;
  }

  if (maxbun > maxPatty) {
    return maxPatty;
  } else {
    return maxPatty - 1;
  }
};

console.log(solve(10, 13, 11234567890));
