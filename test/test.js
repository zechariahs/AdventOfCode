var util = require("../util.js");
const {calculate, solve} = require('../2023/day1');
const Day1a = require('../2023/day1a');
var assert = require ('assert');
var mmxxiv = require ("../2024/index.js");
var mmxxivd2 = require("../2024/day2.js");
var mmxxivd3 = require("../2024/day3.js");

const testData_2023 = [
    "1abc2",
    "pqr3stu8vwx",
    "a1b2c3d4e5f",
    "treb7uchet"
];

const testData_2023Day1a = [
    "two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen",
];

function getUnitTestsFor2024D3() {
    return describe("Unit Tests for 2024 - Day Three", () => {
        describe("#identifyMulCommands(strSampleData)", () => {
            it("should find 4 commands", () => {

                var strSampleData = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
                
                var lstActualResults = mmxxivd3.identifyMulCommands(strSampleData);

                assert.equal(lstActualResults.length, 4);

            });
        }),
        describe("#performMultiplication(strSampleData)", () => {
            it("should calculate a sum of 161", () => {

                var strSampleData = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
                
                var lstActualResults = mmxxivd3.identifyMulCommands(strSampleData);

                var nbrSum = 0;

                lstActualResults.forEach((command) => {

                    nbrSum += mmxxivd3.performMultiplication(command);

                });

                assert.equal(nbrSum, 161);

            });
        }),
        describe("#calculate(actualData, boolEnabledOnly => false)", () => {
            it("should calculate sum of 185797128", async () => {

                var nbrSum = await mmxxivd3.calculate('2024/data/d3p1.txt', false)

                assert.equal(nbrSum, 185797128);

            });
        }),
        describe("#identifyEnabledCommands(strSampleData)", () => {
            it("should find 2 commands", () => {

                var strSampleData = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
                
                var lstCommands = mmxxivd3.identifyCommands(strSampleData);
                
                var lstActualResults = mmxxivd3.identifyEnabledCommands(lstCommands);

                assert.equal(lstActualResults.length, 2);

            });
        }),
        describe("#performMultiplication(strSampleData)", () => {
            it("should calculate a sum of 48", () => {

                var strSampleData = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
                
                var lstCommands = mmxxivd3.identifyCommands(strSampleData);
                
                var lstActualResults = mmxxivd3.identifyEnabledCommands(lstCommands);

                var nbrSum = 0;

                lstActualResults.forEach((command) => {

                    nbrSum += mmxxivd3.performMultiplication(command);

                });

                assert.equal(nbrSum, 48);

            });
        }),
        describe("#calculate(actualData, boolEnabledOnly => true)", () => {
            it("should calculate sum of 89798695", async () => {

                var nbrSum = await mmxxivd3.calculate('2024/data/d3p1.txt', true)

                assert.equal(nbrSum, 89798695);

            });
        })
    });
}

function getUnitTestsFor2024D2() {
    return describe("Unit Tests for 2024 - Day Two", () => {
        describe("#parseLine()", () => {
            it("should extract create an array of numbers.", () => {

                var strSampleData = "7 6 4 2 1";
                var lstExpectedResults = [7, 6, 4, 2, 1];
                
                var lstActualResults = mmxxivd2.parseLine(strSampleData);

                assert.deepEqual(lstActualResults, lstExpectedResults);

            });
        }),
        describe("#countOfSafeReports(lstSampleData, false)", () => {
            it("should find two safe reports with dampener disabled", () => {

                var lstSampleData = [
                    "7 6 4 2 1",
                    "1 2 7 8 9",
                    "9 7 6 2 1",
                    "1 3 2 4 5",
                    "8 6 4 4 1",
                    "1 3 6 7 9"
                ];

                var lstLoadedData = mmxxivd2.loadData(lstSampleData);
                
                var intActualResult = mmxxivd2.countSafeReports(lstLoadedData, false);

                assert.equal(intActualResult, 2);

            });
        }),
        describe("#countOfSafeReports(lstActualData, false)", () => {
            it("should find 624 safe reports with dampener disabled", async () => {

                await util.readData('2024/data/d2p1.txt').then((lstActualData) => {

                    var lstLoadedData = mmxxivd2.loadData(lstActualData);
                
                    var intActualResult = mmxxivd2.countSafeReports(lstLoadedData, false);

                    assert.equal(intActualResult, 624);

                });

                

            });
        }),
        describe("#countOfSafeReports(lstSampleData, true)", () => {
            it("should find 4 safe reports with dampener enabled", async () => {

                var lstSampleData = [
                    "7 6 4 2 1",
                    "1 2 7 8 9",
                    "9 7 6 2 1",
                    "1 3 2 4 5",
                    "8 6 4 4 1",
                    "1 3 6 7 9"
                ];

                var lstLoadedData = mmxxivd2.loadData(lstSampleData);
                
                var intActualResult = mmxxivd2.countSafeReports(lstLoadedData, true);

                assert.equal(intActualResult, 4);

                

            });
        }),
        describe("#countOfSafeReports(lstActualData, true)", async () => {
            it("should find 658 safe reports with dampener enabled", async () => {

                await util.readData('2024/data/d2p1.txt').then((lstActualData) => {

                    var lstLoadedData = mmxxivd2.loadData(lstActualData);
                
                    var intActualResult = mmxxivd2.countSafeReports(lstLoadedData, true);

                    assert.equal(intActualResult, 658);

                });

                

            });
        })

    });
}

function getUnitTestsFor2024D1() {
    describe("Unit Tests for 2024 - Day One", () => {
        describe("#parseLine()", () => {
            it("should extract 42, 17, 3, and 25.", () => {

                var strSampleData = "The numbers are 42 and 17. There are also 3 and 25 here.";
                var lstExpectedResults = [42, 17, 3, 25];
                
                var lstActualResults = mmxxiv.parseLine(strSampleData);

                assert.deepEqual(lstActualResults, lstExpectedResults);

            });
        }),
        describe("#loadData()", () => {
            it("should create a multi-dimensional array with 2 columns and 6 rows.", () => {

                var lstSampleData = [
                    "3   4", 
                    "4   3", 
                    "2   5", 
                    "1   3", 
                    "3   9", 
                    "3   3", 
                ];

                var lstExpectedResults = [
                    [3, 4, 2, 1, 3, 3],
                    [4, 3, 5, 3, 9, 3]
                ]

                var lstActualResults = mmxxiv.loadData(lstSampleData);

                assert.deepEqual(lstActualResults, lstExpectedResults);

            });
        }),
        describe("#calculate(demo)", () => {
            it("should use demo data to calculate a result of 11.", () => {

                var lstSampleData = [
                    "3   4", 
                    "4   3", 
                    "2   5", 
                    "1   3", 
                    "3   9", 
                    "3   3", 
                ];

                var lstLoadedData = mmxxiv.loadData(lstSampleData);
                
                var nbrActualResult= mmxxiv.calculate(lstLoadedData);

                assert.equal(nbrActualResult, 11);

            });
        }),
        describe("#calculate(real)", () => {
            it("should use real data to calculate a result of 2904518.", async () => {

                await mmxxiv.readData("2024/data/d1p1.txt").then((lstInputData) => {

                    var lstLoadedData = mmxxiv.loadData(lstInputData);
                    var intActualResult = mmxxiv.calculate(lstLoadedData);
                    assert.equal(intActualResult, 2904518);

                });
            });
        }),
        describe("#calculateSimilarityScore(real)", () => {
            it("should use real data to calculate a result of 11.", async () => {

                await mmxxiv.readData("2024/data/d1p1.txt").then((lstInputData) => {

                    var lstLoadedData = mmxxiv.loadData(lstInputData);
                    var intActualResult = mmxxiv.calculateSimilarityScore(lstLoadedData);
                    assert.equal(Number(intActualResult), 18650129);

                });
            });
        })
    });
}

describe("Unit Tests for 2024", () => {
    getUnitTestsFor2024D1(),
    getUnitTestsFor2024D2(),
    getUnitTestsFor2024D3()
});

/*
describe('Unit Tests for 2023', () => {
    describe("Unit Tests for Day 1, Part 1", () => {
        describe('#calculate()', () => {
            it("should match the Day 1 sample result", () => {
                assert.equal(calculate(testData_2023), 142);
            });
        }),
        describe('#solve()', () => {
            it("should match my real result", async () => {
                assert.equal(await solve(), 54630)
            });
        });
    }),
    describe("Unit Tests for Day 1, Part 2", () => {
        describe('#translate()', () => {
            it("should translate one to 1, two to 2, etc.", () => {
                var translated = [
                    "219",
                    "8wo3",
                    "abc123xyz",
                    "x2ne34",
                    "49872",
                    "z1ight234",
                    "7pqrst6teen"
                ];
                
                var temp = Day1a.translate(testData_2023Day1a);

                assert.deepEqual(temp, translated);
            })
        }),
        describe('#calculate()', () => {
            it("should match the Day 1, Part 2 sample result", () => {
                
                assert.equal(Day1a.calculate(testData_2023Day1a), 281);
            });
        }),
        describe('#solve()', () => {
            it("should match my real result", async () => {
                assert.equal(await Day1a.solve(), 54770)
            });
        });
    });
});
*/