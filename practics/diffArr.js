var findDifference = function (nums1, nums2) {
  let fc1 = {};
  let fc2 = {};
  for (let elem of nums1) {
    fc1[elem] = (fc1[elem] || 0) + 1;
  }
  for (let elem of nums2) {
    fc2[elem] = (fc2[elem] || 0) + 1;
  }

  let res = [[], []];
  for (let elem in fc1) {
    if (!fc2[elem]) res[0].push(+elem);
  }
  for (let elem in fc2) {
    if (!fc1[elem]) res[1].push(+elem);
  }

  return res;
};

findDifference([1, 2, 3, 3], [1, 1, 2, 2]);
