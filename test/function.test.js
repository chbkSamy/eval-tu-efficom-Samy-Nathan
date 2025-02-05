const { isEven, calculateTotalPrice, processPurchase, sendNotification, generatePassword } = require("./../src/function.js");



describe("When I Check if it is even a number", () => {
    test("When I return an even number then it should return true", () => {
        expect(isEven(2)).toBe(true);
    });

    test("When I return an odd number then it should return false", () => {
        expect(isEven(3)).toBe(false);
});

    test("When I return a string then it should throw an error", () => {
        expect(() => isEven("pr")).toThrow(new Error("Input must be a number"));
    });

    test("When I return null then it should throw an error", () => {
        expect(() => isEven(null)).toThrow(new Error("Input must be a number"));
    });

    test("When I return an even negative number then it should return true", () => {
        expect(isEven(-2)).toBe(true);
    });

    test("When I return an odd negative number then it should return false", () => {
        expect(isEven(-3)).toBe(false);
    });


});
