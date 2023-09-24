var fs = require('fs');

var DEFAULTS = {
  INPUT_FILE: 'input.txt',
  OUTPUT_FILE: 'output.txt',
  TEST_OUTPUT: 'test_output.txt',
};

var _l = console.log,
  _d = console.dir;

var Input = function (file) {
  return (
    fs
      .readFileSync(file)
      .toString()
      // Remove the first line with the number of test cases.
      .replace(/^\d+\n/, '')
      // Trim ending linebreak.
      .replace(/\n$/, '')
      // Create an array of lines.
      .split('\n')
      // Run each line through the parser.
      .map(this.parser)
  );
};

Input.prototype.parser = function (testCase) {
  let dataObj = {};
  let dataArr = testCase.split(' ');
  for (let i = 0; i < dataArr.length; i++) {
    if (i === 0) dataObj.s = parseInt(dataArr[i]);
    if (i === 1) dataObj.d = parseInt(dataArr[i]);
    if (i === 2) dataObj.k = parseInt(dataArr[i]);
  }
  return dataObj;
};

// Constructor
var Case = function (data) {
  this.data = data;
};

// Solve
Case.prototype.solve = function () {
  // solution
  const { s, d, k } = this.data;
  console.log(this.data);
  console.log(s, d, k);
  let bun = s * 2 + d * 2;
  let patty = s + d * 2;
  let cheese = s + d * 2;

  if (bun < k + 1) {
    return 'NO';
  } else {
    if (patty < k || cheese < k) return 'NO';
    return 'YES';
  }
};

// driver code
var Arg = { v: process.argv.slice(2) };
Arg.command = Arg.v[0];
Arg.getTest = function () {
  var i,
    n = isNaN(parseInt(Arg.v[1], 10)) ? null : parseInt(Arg.v[1], 10);
  if (n == null) i = 1;
  else i = 2;
  return {
    n: n,
    i: Arg.v[i] || DEFAULTS.INPUT_FILE,
    o: Arg.v[i + 1] || DEFAULTS.TEST_OUTPUT,
  };
};
Arg.getOutput = function () {
  return {
    i: Arg.v[0] || DEFAULTS.INPUT_FILE,
    o: Arg.v[1] || DEFAULTS.OUTPUT_FILE,
  };
};

var Output = function (file) {
  return fs
    .readFileSync(file)
    .toString()
    .replace(/\n$/, '')
    .split('\n')
    .map(function (l) {
      return l.replace(/^Case\s#\d+:\s/, '');
    });
};

var Runner = function (inputFile, outputFile) {
  this.inputFile = inputFile;
  this.outputFile = outputFile;
  this.input = new Input(inputFile);
};

Runner.prototype.test = function (n) {
  var startTime,
    endTime,
    outputData = new Output(this.outputFile),
    cases = (n == null ? this.input : this.input.slice(n - 1, n)).map(function (
      d
    ) {
      return new Case(d);
    });

  cases.forEach(function (c, i) {
    var sTime,
      time,
      result,
      correct,
      j = n == null ? i : n - 1;

    sTime = new Date().getTime();
    result = c.solve();
    time = new Date().getTime() - sTime;
    correct = result === outputData[j];

    _l(
      (correct ? '\x1b[32m' : '\x1b[31m') +
        '================================================================================' +
        '\n' +
        '#' +
        (j + 1) +
        ' ' +
        time +
        'ms ' +
        correct +
        '\n' +
        '================================================================================'
    );
    _d(result);
    _d(outputData[j]);
    _l('\n');
  });
};

Runner.prototype.output = function () {
  var output = '';
  this.input
    .map(function (d) {
      return new Case(d);
    })
    .forEach(function (c, i) {
      output += (i > 0 ? '\n' : '') + 'Case #' + (i + 1) + ': ' + c.solve();
    });
  _l(output);
  fs.writeFileSync(this.outputFile, output);
};

switch (Arg.command) {
  case '-t':
    // If next argument is numeric then test only that case otherwise test all.
    var arg = Arg.getTest(),
      test = new Runner(arg.i, arg.o).test(arg.n);
    break;
  default:
    var arg = Arg.getOutput();
    output = new Runner(arg.i, arg.o).output();
}
