var util = require("../util.js");
var assert = require ('assert');
// const Test2024 {getUnitTestsFor2024D1, getUnitTestsFor2024D2, getUnitTestsFor2024D3} = require("../test/test_2024.js");
const {getUnitTestsFor2025D1, getUnitTestsFor2025D2} = require("../test/test_2025.js");

describe("Unit Tests for 2025", () => {
    getUnitTestsFor2025D2(),
    getUnitTestsFor2025D1();
});


/*
describe("Unit Tests for 2024", () => {
    Test2024.getUnitTestsFor2024D1(),
    Test2024.getUnitTestsFor2024D2(),
    Test2024.getUnitTestsFor2024D3()
});
*/




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