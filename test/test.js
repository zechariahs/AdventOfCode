const {calculate, solve} = require('../2023/day1');
const Day2 = require('../2023/day2');
var assert = require ('assert');


const testData = [
    "1abc2",
    "pqr3stu8vwx",
    "a1b2c3d4e5f",
    "treb7uchet"
];

const testDataDay2 = [
    "two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen",
]

describe('Unit Tests for 2023', () => {
    describe("Unit Tests for Day 1", () => {
        describe('#calculate()', () => {
            it("should match the Day 1 sample result", () => {
                assert.equal(calculate(testData), 142);
            });
        }),
        describe('#solve()', () => {
            it("should match my real result", async () => {
                assert.equal(await solve(), 54630)
            });
        });
    }),
    describe("Unit Tests for Day 2", () => {
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
                
                var temp = Day2.translate(testDataDay2);

                assert.deepEqual(temp, translated);
            })
        }),
        describe('#calculate()', () => {
            it("should match the Day 2 sample result", () => {
                
                assert.equal(Day2.calculate(testDataDay2), 281);
            });
        }),
        describe('#solve()', () => {
            it("should match my real result", async () => {
                assert.equal(await Day2.solve(), 54770)
            });
        });
    });
});