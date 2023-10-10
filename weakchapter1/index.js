function weakChapter(strlen, str) {
  let switchCount = 0;
  let convertStr = str.replaceAll('F', '');
  for (let r = 0; r < convertStr.length; r++) {
    if (convertStr[r] === 'X' && convertStr[r + 1] === 'O') switchCount++;
    if (convertStr[r] === 'O' && convertStr[r + 1] === 'X') switchCount++;
  }
  return switchCount;
}

console.log(weakChapter(1, 'O'));
console.log(weakChapter(3, 'XFO'));
console.log(weakChapter(5, 'FFOFF'));
console.log(weakChapter(10, 'FXXFXFOOXF'));
console.log(weakChapter(13, 'XFOFXFOFXFOFX'));
