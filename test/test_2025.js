var assert = require ('assert');
var util = require("../util.js");
var mmxxvd1 = require ("../2025/day1.js");

function getUnitTestsFor2025D1() {
    return describe("Day 1, Parts 1 and 2", () => {

        describe("#processData with sample data", () => {
            it("should return 3", () => {
        
                var lstSampleData = [
                    "L68",
                    "L30",
                    "R48",
                    "L5",
                    "R60",
                    "L55",
                    "L1",
                    "L99",
                    "R14",
                    "L82"
                ];
        
                var intActualResult = mmxxvd1.processData(lstSampleData, 50);
        
                assert.equal(intActualResult, 3);
            });
        }),
        describe("#processData with actual data", () => {
            it("should return 1120", async () => {
        
                await util.readData("2025/data/d1p1.txt").then((lstInputData) => {;
        
                    var intActualResult = mmxxvd1.processData(lstInputData, 50);
        
                    assert.equal(intActualResult, 1120);
                });
            });
        }),
        describe("#processData with actual data using alternate counting method", () => {
            it("should return 6554", async () => {
        
                await util.readData("2025/data/d1p1.txt").then((lstInputData) => {;
        
                    var intActualResult = mmxxvd1.processData(lstInputData, 50, true);
                    assert.equal(intActualResult, 6554);
                });
            });
        });      
        
    });
}

module.exports = {getUnitTestsFor2025D1};