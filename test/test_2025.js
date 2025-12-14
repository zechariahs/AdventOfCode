/**
 * Copyright (c) 2025 by Zechariah Schwenk, All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://opensource.org/licenses/MIT
 */

var assert = require ('assert');
var util = require("../util.js");
var mmxxvd1 = require ("../2025/day1.js");
var mmxxvd2 = require ("../2025/day2.js");

/**
 * Gets the unit tests for 2025 Day 2.
 * @returns 
 */
function getUnitTestsFor2025D2() {
    return describe("Day 2, Parts 1 and 2", () => {
        describe("#processData with sample data", () => {
            it("should return 1227775554", () => {
        
                let sampleData = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";
        
                var intActualResult = mmxxvd2.processData(sampleData, ",");
        
                assert.equal(intActualResult, 1227775554);
            });
        }),
        describe("#processData with actual data", () => {
            it("should return 40214376723", async () => {
        
                await util.readData("2025/data/d2p1.txt").then((lstInputData) => {
        
                    var strInputData = lstInputData[0];
        
                    var intActualResult = mmxxvd2.processData(strInputData, ",");
        
                    assert.equal(intActualResult, 40214376723);
                });
            });
        }),
        describe("#processData with sample data using alternate counting method", () => {
            it("should return 4174379265", () => {
        
                let sampleData = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";
        
                var intActualResult = mmxxvd2.processData(sampleData, ",", true);
        
                assert.equal(intActualResult, 4174379265);
            });
        }),
        describe("#processData with actual data using alternate counting method", () => {
            it("should return 50793864718", async () => {
        
                await util.readData("2025/data/d2p1.txt").then((lstInputData) => {
        
                    var strInputData = lstInputData[0];
        
                    var intActualResult = mmxxvd2.processData(strInputData, ",", true);
        
                    // 10632638764 is too low.
                    assert.equal(intActualResult, 50793864718);
                });
            });
        });
        
        
    });
}

/**
 * Gets the unit tests for 2025 Day 1.
 * @returns 
 */
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

module.exports = {getUnitTestsFor2025D1, getUnitTestsFor2025D2};