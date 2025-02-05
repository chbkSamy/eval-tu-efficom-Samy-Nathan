const{processPurchase, sendNotification, calculateTotalPrice} = require("./../src/function.js");


describe("When I process a purchase", () => {

    test('when I process a purchase then it calculate total, send notification, and return total', () => {

        const cart = [25, 25]
        const taxRate = 2
        totalPrice = 100;

        jest.spyOn(calculateTotalPrice, "calculateTotalPrice").mockImplementation(() => totalPrice);
        const sendNotification = jest.spyOn(sendNotification, "log").mockImplementation(() => {});
        processPurchase(cart, taxRate)
        expect(calculateTotalPrice.calculateTotalPrice).toHaveBeenCalledWith(cart, taxRate);
        expect(sendNotification).toHaveBeenCalledWith(`Notification envoyée : Votre total est de ${totalPrice.toFixed(2)} €`);

        jest.restoreAllMocks();
      });

});

