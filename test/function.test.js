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

describe("When I process a purchase", () => {

    test('when I process a purchase then it calculate total, send notification, and return total', () => {


        jest.spyOn(console, "log").mockImplementation(() => {});
        const cart = [10, 50]
        const taxRate = 1.20
        const totalPrice = calculateTotalPrice(cart, taxRate);
        processPurchase(cart, taxRate)
        expect(console.log).toHaveBeenCalledWith(`Notification envoyée : Votre total est de ${totalPrice.toFixed(2)} €`);

        jest.restoreAllMocks();
      });

});

describe("When IgeneratePassword", () => {

    test("When I generate a password with less than 6 characters then it should return an error", () => {
        expect(() => generatePassword(5)).toThrow(Error('Length must be a number greater than or equal to 6'));
    });

    test("When I generate a password with more than 6 characters then it should return the password", () => {
        const password = generatePassword(7);
        expect(password.length).toBeGreaterThanOrEqual(6);
    });

    test("When I generate a password with uppercase characters then it should return the password with only uppercase characters", () => {
        const password = generatePassword(7, {  uppercase: true, numbers: false, specialChars: false});
        expect(password).not.toMatch(/[!@#$%^&*()_+[]{}|;:,.<>?]/,/[0-9]/);
    });

    test("When I generate a password with numbers then it should return the password with only numbers", () => {
        const password = generatePassword(7, { uppercase: false, numbers: true, specialChars: false});
        expect(password).not.toMatch(/[!@#$%^&*()_+[]{}|;:,.<>?]/,/[A-Z]/);
    });

    test("When I generate a password with special characters then it should return the password whith only special characters", () => {
        const password = generatePassword(7, {  uppercase: false, numbers: false, specialChars: true});
        expect(password).not.toMatch(/[0-9]/,/[A-Z]/);
    });

    test("When I generate a password without uppercase, numbers and special characters then it should return the password without uppercase, numbers and special characters", () => {
        const password = generatePassword(7, {  uppercase: false, numbers: false, specialChars: false});
        expect(password).not.toMatch(/[!@#$%^&*()_+[]{}|;:,.<>?]/,/[0-9]/,/[A-Z]/);
    })

    test("When I generate a password with uppercase and numbers  then it should return the password with uppercase and numbers", () => {
        const password = generatePassword(7, {  uppercase: true, numbers: true, specialChars: false});
        expect(password).not.toMatch(/[!@#$%^&*()_+[]{}|;:,.<>?]/);

    })

    test("When I generate a password with uppercase and special characters then it should return the password with uppercase and special characters", () => {
        const password = generatePassword(7, {  uppercase: true, numbers: false, specialChars: true});
        expect(password).not.toMatch(/[0-9]/);
    })

    test("When I generate a password with numbers and special characters then it should return the password with numbers and special characters", () => {
        const password = generatePassword(7, {  uppercase: false, numbers: true, specialChars: true});
        expect(password).not.toMatch(/[A-Z]/);
    })

    test("When I generate a password with uppercase, numbers and special characters then it should return the password with uppercase, numbers and special characters", () => {

        expect(generatePassword(7, {  uppercase: true, numbers: true, specialChars: true}).match(/[!@#$%^&*()_+[]{}|;:,.<>?]/,/[0-9]/,/[A-Z]/));

    })


});
