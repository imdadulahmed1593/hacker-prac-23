var reverseVowels = function (s) {
  if (s.length === 1) return s;
  s = s.split('');
  let presentVowels = [];
  for (let i = 0; i < s.length; i++) {
    const element = s[i];
    if (['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'].includes(element)) {
      presentVowels.push({ pos: i, letter: element });
    }
  }
  console.log(presentVowels);
  for (let j = 0; j < presentVowels.length; j++) {
    s.splice(
      presentVowels[j].pos,
      1,
      presentVowels[presentVowels.length - 1 - j].letter
    );
  }
  return s.join('');
};

console.log(reverseVowels('aA'));
