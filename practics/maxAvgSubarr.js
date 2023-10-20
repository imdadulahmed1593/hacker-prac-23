var findMaxAverage = function (nums, k) {
  let maxsum = 0;
  const cal = 0.00001;
  let avg = 0;
  for (let i = 0; i < k; i++) {
    maxsum += nums[i];
  }
  if (nums.length === k) {
    avg = maxsum / k;
    return avg.toFixed(5);
  }
  let cursum = maxsum;
  for (let i = k; i < nums.length; i++) {
    cursum = cursum - nums[i - k] + nums[i];
    maxsum = Math.max(cursum, maxsum);
  }
  avg = maxsum / k;
  return avg.toFixed(5);
};

console.log(findMaxAverage([1, 12, -5, -6, 50, 3], 4));
