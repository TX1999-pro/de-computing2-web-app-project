import leaderboard from "./leaderboard.js";
import F from "./function.js";

const describe = window.describe;
const it = window.it;
const fc = window.fastcheck;
const chai = window.chai;


/*
A unit test is a test of behaviour whose success or failure is wholly
determined by the correctness of the test and the correctness of the
unit under test. -- Kevlin Henney
*/


describe("Mocha", function () {
    it("Correctly initialises Mocha", function () {
    });

    it("Correctly initialises FastCheck", function () {
        fc.assert(fc.property(fc.integer(), () => true));
    });
});

describe("Example based testing", function() {
    it("Correctly created a unit testing", function(){

    });

    it("Example to be cleared", function() {

    });
});

// Don write tests. Generate them. -- John Hughes


describe("Property based testing", function() {
    it(
        "Given a condition" +
        "After operation" +
        "Expected results",
        function(){
            fc.assert(fc.property(
            arbScore,

            function () {
                return true;
            }

        ));

    });

    it("Example to be cleared", function() {

    });
});
