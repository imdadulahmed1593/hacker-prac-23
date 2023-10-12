var kidsWithCandies = function (candies, extraCandies) {
  let maxCandies = Math.max(...candies);
  let res = candies.map((candy) =>
    candy + extraCandies >= maxCandies ? true : false
  );
  return res;
};

console.log(kidsWithCandies([2, 3, 5, 1, 3], 3));
console.log(kidsWithCandies([4, 2, 1, 1, 2], 1));
console.log(kidsWithCandies([12, 1, 12], 10));
