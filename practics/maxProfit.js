// const maxProfit = function (prices) {    //o(n^2)
//   let maxP = 0;
//   for (let i = 0; i < prices.length - 1; i++) {
//     for (let j = i + 1; j < prices.length; j++) {
//       if (prices[j] > prices[i]) maxP = Math.max(maxP, prices[j] - prices[i]);
//     }
//   }

//   return maxP;
// };

const maxProfit = function (prices) {
  //o(n)
  let l = 0,
    r = 1;
  let maxP = 0;
  while (r < prices.length) {
    // is this a profitable transaction?
    if (prices[l] < prices[r]) {
      maxP = Math.max(maxP, prices[r] - prices[l]);
    } else {
      l = r;
    }
    r++;
  }

  return maxP;
};

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit([7, 6, 4, 3, 1]));
