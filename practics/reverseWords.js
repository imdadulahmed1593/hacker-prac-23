var reverseWords = function (s) {
  let res = s.trim().split(/\s+/g).reverse().join(' ');
  return res;
};

console.log(reverseWords('example  '));
