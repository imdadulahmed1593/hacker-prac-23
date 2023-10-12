var fs = require('fs');

var DEFAULTS = {
  INPUT_FILE: 'input.txt',
  OUTPUT_FILE: 'output.txt',
  TEST_OUTPUT: 'test_output.txt',
};

var _l = console.log,
  _d = console.dir;

var Input = function (file) {
  let testCases = fs
    .readFileSync(file)
    .toString()
    // Remove the first line with the number of test cases.
    .replace(/^\d+\n/, '')
    // Trim ending linebreak.
    .replace(/\n$/, '')
    // Create an array of lines.
    .split('\n');
  return this.parser(testCases);
};

Input.prototype.parser = function (testCases) {
  let testCasesArr = [];

  for (let i = 0; i < testCases.length; i += 2) {
    let dataObj = {};
    let testLine1 = testCases[i].split(' ');
    let testLine2 = testCases[i + 1].split(' ');
    dataObj.n = parseInt(testLine1[0]);
    dataObj.k = parseInt(testLine1[1]);
    dataObj.arr = testLine2;
    // console.log(typeof dataObj.n);
    testCasesArr.push(dataObj);
  }
  return testCasesArr;
};

// Constructor
var Case = function (data) {
  this.data = data;
};

// Solve
Case.prototype.solve = function () {
  // solution
  const { n, k, arr } = this.data;
  if (k * 2 < n) return 'NO';
  let fc = {};
  for (let elem of arr) {
    fc[elem] = (fc[elem] || 0) + 1;
  }

  if (Object.keys(fc).length > k * 2) return 'NO';
  for (let key in fc) {
    if (fc[key] > 2) return 'NO';
  }
  return 'YES';
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
