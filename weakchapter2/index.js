function findSwitchCount(str) {
  let switchCount = 0;
  let convertStr = str.replaceAll('F', '');
  for (let r = 0; r < convertStr.length; r++) {
    if (convertStr[r] === 'X' && convertStr[r + 1] === 'O') switchCount++;
    if (convertStr[r] === 'O' && convertStr[r + 1] === 'X') switchCount++;
  }

  return switchCount;
}

function findAllSubstrings(inputString) {
  const substrings = [];

  for (let i = 0; i < inputString.length; i++) {
    for (let j = i + 1; j <= inputString.length; j++) {
      substrings.push(inputString.slice(i, j));
    }
  }
  return substrings;
}

function weakChapter2(strlen, str) {
  let substrs = findAllSubstrings(str);
  let res = 0;
  for (let substr of substrs) {
    res += findSwitchCount(substr);
  }
  return res;
}

console.log(weakChapter2(1, 'O'));
console.log(weakChapter2(3, 'XFO'));
console.log(weakChapter2(5, 'FFOFF'));
console.log(weakChapter2(10, 'FXXFXFOOXF'));
console.log(weakChapter2(13, 'XFOFXFOFXFOFX'));
