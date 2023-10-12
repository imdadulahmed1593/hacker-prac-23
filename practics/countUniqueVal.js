function countUniqueval(arr) {
  if (arr.length === 0) return 0;
  let i = 0;
  for (let j = 0; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1;
}

// function countUniqueval(arr) {
//   if (arr.length === 0) return 0;
//   let fc = {};
//   for (let elem of arr) {
//     fc[elem] = ++fc[elem] || 1;
//   }
//   return Object.keys(fc).length;
// }

// console.log(countUniqueval([1, 1, 1, 1, 2]));
let t1 = performance.now();
console.log(countUniqueval([1, 2, 3, 3, 4, 7, 12, 12, 13]));
let t2 = performance.now();
console.log(`time elapsed ${t2 - t1} msecs`);
// console.log(countUniqueval([]));
// console.log(countUniqueval([-2, -1, -1, 0, 0, 1]));
