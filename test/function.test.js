const { isEven, calculateTotalPrice, processPurchase, sendNotification, generatePassword } = require("./../src/function.js");



describe("When I Check if it is even a number", () => {
    test("When I return an even number then it should return true", () => {
        expect(isEven(2)).toBe(true);
    });

    test("When I return an odd number then it should return false", () => {
        expect(isEven(3)).toBe(false);
});

    test("When I return a string then it should throw an error", () => {
        expect(() => isEven("pr")).toThrow(Error("Input must be a number"));
    });

    test("When I return null then it should throw an error", () => {
        expect(() => isEven(null)).toThrow(Error("Input must be a number"));
    });

    test("When I return an even negative number then it should return true", () => {
        expect(isEven(-2)).toBe(true);
    });

    test("When I return an odd negative number then it should return false", () => {
        expect(isEven(-3)).toBe(false);
    });


});


describe("When I calculate the total price of the cart", () => {

    test("When I return an array of prices then it should return the total price", () => {
        expect(calculateTotalPrice([1, 2], 1.20)).toBe(6.60);
    });

    test("When I return an array of negative prices then it should return an error", () => {
        expect(() => calculateTotalPrice([-1, -2, -3], 1.20)).toThrow(Error("Each price must be a non-negative number"));
        ;
    });

    test("When I return a string then it should throw an error", () => {
        expect(() => calculateTotalPrice("pr", 1.20)).toThrow(Error("Prices must be an array"));
    });

    test("When I return null then it should throw an error", () => {
        expect(() => calculateTotalPrice(null, 1.20)).toThrow(Error("Prices must be an array"));
    });

    test("When I return a number then it should throw an error", () => {
        expect(() => calculateTotalPrice(1, 1.20)).toThrow(Error("Prices must be an array"));
    });

    // test("When I return an empty array then it should throw an error", () => {
    //     expect(() => calculateTotalPrice([], 1.20)).toThrow(Error("Each price must be a non-negative number"));
    // });

    test("When I return to taxrate null then it should throw an error", () => {
        expect(() => calculateTotalPrice([1, 2], null)).toThrow(Error("Tax rate must be a number"));
    });

});


describe("When I send a notification", () => {

    test("When I send a message then it return the  message", () => {
        const message = "test";
        jest.spyOn(console, "log").mockImplementation(() => {});
        sendNotification(message);
        expect(console.log).toHaveBeenCalledWith(`Notification envoyée : ${message}`);

        jest.restoreAllMocks();
    });
});
