const {calculate, solve} = require('../2023/day1');
var assert = require ('assert');


const testData = [
    "1abc2",
    "pqr3stu8vwx",
    "a1b2c3d4e5f",
    "treb7uchet"
];

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
    });
});