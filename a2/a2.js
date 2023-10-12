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
    if (i === 0) dataObj.a = parseInt(dataArr[i]);
    if (i === 1) dataObj.b = parseInt(dataArr[i]);
    if (i === 2) dataObj.c = parseInt(dataArr[i]);
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
  const { a, b, c } = this.data;
  if (c < a && c < b) return 0;
  let maxPatty;
  let maxbun;
  let noOfSingles = Math.floor(c / a);
  let noOfDoubles = Math.floor(c / b);
  if (c % b !== 0 && (c % b) % a === 0) {
    maxPatty = Math.max(noOfSingles, noOfDoubles * 2 + (c % b) / a);
    maxbun = Math.max(noOfSingles * 2, (noOfDoubles + (c % b) / a) * 2);
  } else if (c % a !== 0 && (c % a) % b === 0) {
    maxPatty = Math.max(noOfDoubles * 2, noOfSingles + ((c % a) / b) * 2);
    maxbun = Math.max(noOfDoubles * 2, noOfSingles * 2 + ((c % a) / b) * 2);
  } else {
    maxPatty = Math.max(noOfSingles, noOfDoubles * 2);
    maxbun = noOfSingles > noOfDoubles * 2 ? noOfSingles * 2 : noOfDoubles * 2;
  }

  if (maxbun > maxPatty) {
    return maxPatty;
  } else {
    return maxPatty - 1;
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
