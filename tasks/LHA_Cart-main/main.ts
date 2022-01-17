const uuid = () => {
    const itemID = Math.random().toString(11)
    return itemID

}



interface ICartItem {
    name: string;
    category: string[];
    price: number;
    discount: number;
    quantity: number;
    uuid: string;
    modifyPrice(newPrice: number): void
    changeDiscount(newDiscount: number): void
    addCategory(newCategory: string): void
    changeParameter(key: string, value: (string | number)): void
    calculateDiscount(): number
}

type availableParametersKeys = "name" | "discount" | "price";

class CartItem {
    name: string;
    category: string[];
    price: number;
    discount: number;
    quantity: number;
    uuid: string;


    constructor(name: string, category: string, price: number, discount: number, quantity: number) {
        if (typeof name !== "string" || name.length === 0) throw Error("Invalid product name."); // ""
        if (!Number.isFinite(price) || price <= 0) throw Error("Invalid price, price have to be positive.")
        if (!Number.isFinite(discount) || discount <= 0) throw Error("Invalid discount value.")

        this.name = name
        this.category = [category]
        this.price = price
        this.discount = discount
        this.quantity = quantity
        this.uuid = uuid()
    }


    modifyPrice(newPrice: number) {
        if (!Number.isFinite(newPrice) || newPrice <= 0) throw Error("Price have to be a number.")
        this.price = newPrice
    }

    changeDiscount(newDiscount: number) {
        if (!Number.isFinite(newDiscount) || newDiscount <= 0) throw Error("Discount have to be a positive number.")

        this.discount = newDiscount
    }



    addCategory(newCategory: string) {
        if (newCategory.length < 1 || typeof newCategory !== "string") throw Error("You have to type in a new category.")
        this.category.push(newCategory)
    }



    changeParameter(key: availableParametersKeys, value: (string | number)) {


        switch (key) {
            case "name":
                if (typeof value === "string") this.name = value;
                break;
            case "discount":
                if (typeof value === "number") this.changeDiscount(value);
                break;
            case "price":
                if (typeof value === "number")
                    this.modifyPrice(value)
                break;
            default:
                throw Error("You have chosen wrong paramiter, please try again.")
        }
    }

    calculateDiscount() {
        return this.price * this.discount;
    }

}

const potato = new CartItem("potato", "vegetable", 100, 23, 5)
const tomato = new CartItem("tomato", "vegetable", 125, 31, 5)

console.log(potato.calculateDiscount());

export default CartItem

class Cart {
    uuid: string;
    items: ICartItem[] = [];
    cart_discount: number;
    discount_code: number;


    constructor(cart_discount: number, discount_code: number) {
        this.uuid = uuid()
        this.cart_discount = cart_discount
        this.discount_code = discount_code
    }

    addItem(newCartItem: ICartItem) {

        const isCartItemInArray = this.items.findIndex((el) => {
            el === newCartItem
        })

        if (isCartItemInArray === -1) {
            this.items.push(newCartItem)
        }

        if (isCartItemInArray !== -1) {
            newCartItem.quantity += 1
        }
    }

    removeItem(cartItem: ICartItem) {
        
        const removeItemIndex = this.items.indexOf(cartItem)


        if (removeItemIndex === -1) throw Error(`There is no ${cartItem.name} in your cart.`)

        this.items.splice(removeItemIndex, 1)
    }

    changeItemQuantity(itemName: ICartItem, newQuantity: number) {
        if (!Number.isFinite(newQuantity) || newQuantity <= 0) throw Error("You have to type in correct quantity.")

        // itemName.changeParameter("quantity", newQuantity)
        itemName.quantity = newQuantity
    }

    calculateCart() {
        const noCartDiscountPrice = this.items.reduce((acc, el) => {
            const priceWithDiscount = el.price - (el.price * (el.discount * 0.01))
            const result = acc + priceWithDiscount
            return result
        }, 0)
        const cartPrice = noCartDiscountPrice - (noCartDiscountPrice * (this.cart_discount * 0.01))
        console.log(`Your cart price is ${cartPrice}`);
        return cartPrice;
    }

}

// const cart = new Cart(12, 12);
// cart.addItem(potato)
// cart.addItem(tomato)

// cart.changeItemQuantity(potato, 12)
// cart.calculateCart()

// console.log(cart);