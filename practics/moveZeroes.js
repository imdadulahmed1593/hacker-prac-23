var moveZeroes = function (nums) {
  let left = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[left], nums[i]] = [nums[i], nums[left]];
      left++;
    }
  }
  return nums;
};

console.log(moveZeroes([1, 0, 1, 0, 3, 12]));
console.log(moveZeroes([0]));
console.log(moveZeroes([1, 0, 1]));
