"use strict";
exports.__esModule = true;
var uuid = function () {
    var itemID = Math.random().toString(11);
    return itemID;
};
var CartItem = /** @class */ (function () {
    //po co dwa razy deklarowac typy argumentow w klasie?
    function CartItem(name, category, price, discount, quantity) {
        if (typeof name !== "string" || name.length === 0)
            throw Error("Invalid product name."); // ""
        if (typeof category !== "string")
            throw Error("Invalid category.");
        if (!Number.isFinite(price) || price <= 0)
            throw Error("Invalid price, price have to be positive.");
        if (!Number.isFinite(discount) || discount <= 0)
            throw Error("Invalid discount value.");
        // Rzeczowniki
        this.name = name;
        this.category = [category];
        this.price = price;
        this.discount = discount;
        this.quantity = quantity;
        this.uuid = uuid();
    }
    // Czasowniki
    CartItem.prototype.modifyPrice = function (newPrice) {
        if (!Number.isFinite(newPrice) || newPrice <= 0)
            throw Error("Price have to be a number.");
        this.price = newPrice;
    };
    CartItem.prototype.changeDiscount = function (newDiscount) {
        if (!Number.isFinite(newDiscount) || newDiscount <= 0)
            throw Error("Discount have to be a positive number.");
        this.discount = newDiscount;
    };
    CartItem.prototype.addCategory = function (newCategory) {
        if (newCategory.length < 1 || typeof newCategory !== "string")
            throw Error("You have to type in a new category.");
        this.category.push(newCategory);
    };
    CartItem.prototype.changeParameter = function (key, value) {
        if (typeof key !== "string" || key.length === 0)
            throw Error("You have chosen invalid property.");
        // quantity
        switch (key) {
            case "name":
                if (typeof value === "string")
                    this.name = value;
                break;
            case "discount":
                if (typeof value === "number")
                    this.changeDiscount(value);
                break;
            case "price":
                if (typeof value === "number")
                    this.modifyPrice(value);
                break;
            default:
                throw Error("You have chosen wrong paramiter, please try again.");
        }
    };
    CartItem.prototype.calculateDiscount = function () {
        return this.price * this.discount;
    };
    return CartItem;
}());
var potato = new CartItem("potato", "vegetable", 100, 23, 5);
var tomato = new CartItem("tomato", "vegetable", 125, 31, 5);
console.log(potato.calculateDiscount());
exports["default"] = CartItem;
var Cart = /** @class */ (function () {
    function Cart(cart_discount, discount_code) {
        this.items = [];
        this.uuid = uuid();
        this.cart_discount = cart_discount;
        this.discount_code = discount_code;
    }
    Cart.prototype.addItem = function (newCartItem) {
        // if (!newCartItem instanceof CartItem) throw Error(`There is no product like ${newCartItem} in our shop.`)
        this.items.push(newCartItem);
        //jak otypować instancje innej klasy
    };
    Cart.prototype.removeItem = function (cartItem) {
        if (!this.items.includes(cartItem))
            throw Error("There is no ".concat(cartItem.name, " in your cart."));
        // if (typeof cartItem !== "object") throw Error("You have to type in correct item name.")
        // if (cartItem.length === 0) throw Error("You have to type in item name.")
        var removeItemIndex = this.items.indexOf(cartItem);
        this.items.splice(removeItemIndex, 1);
    };
    Cart.prototype.changeItemQuantity = function (itemName, newQuantity) {
        if (!Number.isFinite(newQuantity) || newQuantity <= 0)
            throw Error("You have to type in correct quantity.");
        // if (!itemName instanceof CartItem) throw Error(`There is no item like${itemName.name}.`)
        itemName.quantity = newQuantity;
    };
    Cart.prototype.calculateCart = function () {
        //jak otypować argumenty w reducie
        var noCartDiscountPrice = this.items.reduce(function (acc, el) {
            var priceWithDiscount = el.price - (el.price * (el.discount * 0.01));
            var result = acc + priceWithDiscount;
            return result;
        }, 0);
        var cartPrice = noCartDiscountPrice - (noCartDiscountPrice * (this.cart_discount * 0.01));
        console.log("Your cart price is ".concat(cartPrice));
    };
    return Cart;
}());
// const cart = new Cart(12, 12);
// cart.addItem(potato)
// cart.addItem(tomato)
// cart.changeItemQuantity(potato, 12)
// cart.calculateCart()
// console.log(cart);
