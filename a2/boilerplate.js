/**
 * Written in Node.js
 * http://nodejs.org
 *
 * Author: Patric Nordmark
 *
 * Usage: node index.js [-t [n]] [<input file>] [<output file>]
 *
 * Running node index.js without any parameters will solve all
 * test cases in input.txt and write the results to output.txt
 *
 * -t [1..N] Test a single case. (omit to test all).
 *
 * <input file>:  Read input data from file (input.txt)
 * <output file>: Output results to file (output.txt)
 *                During test (-t):
 *                  Read correct output from file (test_output.txt)
 *
 *
 * fbhc-boilerplate:
 * Patric Nordmark <patric.nordmark@gmail.com>
 */
var fs = require('fs');

// Default values (these will be used if no command line parameters are given)
var DEFAULTS = {
  INPUT_FILE: 'input.txt',
  OUTPUT_FILE: 'output.txt',
  TEST_OUTPUT: 'test_output.txt',
};

// Aliases to make life easier.
var _l = console.log,
  _d = console.dir;

/**
 * input
 *
 * Modify the parser method to your liking
 * The parser will be called for each line of the input file.
 * And should return the Formatted data that will represent that test case.
 */

/* ======================================================================
 * IF THE INPUT FORMAT IS NOT ONE CASE PER LINE, THIS HAS TO BE MODIFIED.
 * ====================================================================== */
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

/* ======================================================================
 * USE THE PARSER TO FORMAT YOUR INPUT INTO WORKABLE data
 * ====================================================================== */
Input.prototype.parser = function (testCase) {
  return testCase;
};

/* ======================================================================
 * ======================================================================
 * CREATE YOUR SOLUTION HERE.
 * AN INSTANCE WILL BE CREATED FOR EACH TEST CASE.
 * THE solve METHOD WILL BE CALLED FOR EACH TEST CASE.
 * DO NOT RETURN 'CASE #X: ', ONLY THE CORRECT RESULT.
 * ======================================================================
 * ======================================================================
 *
 * Case
 * Modify this class to solve a singe test case.
 *
 * The Constructor will be called with one argument,
 * the data of a single test case, formatted by Input.parser()
 * The solve method will be called upon to solve a single test case.
 */

// Constructor
var Case = function (data) {
  this.data = data;
};

// Solve
Case.prototype.solve = function () {
  // solution
};

/* ======================================================================
 * ======================================================================
 * AFTER THIS LINE IS ONLY ARGUMENT/TEST/RUN CODE. NO NEED TO EDIT.
 * SEE INSTRUCTIONS AT THE TOP OF THIS FILE ON HOW TO USE IT.
 */

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
      // (correct ? '\033[32m' : '\033[31m') +
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
