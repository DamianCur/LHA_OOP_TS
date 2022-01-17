class Switch {
    constructor() {
        this.conditionsArray = []
        this.callbacksArray = []
    }

    add(condition, callback) {
        this.conditionsArray.push(condition)
        this.callbacksArray.push(callback)
    }

    isValid() {
        const result = this.conditionsArray.every((el, index) => {
            if (el === true) {
                const callback = this.callbacksArray[index]
                callback()
                return false
            } else return true
        })
        return result
    }
    isEmpty() {
        if (this.conditionsArray.length === 0 || this.callbacksArray.length === 0) {
            return true
        }
    }
}

const test = new Switch()
const value = "abc.abc.com"


test.add(!value.includes("@"), () => {
    console.error("Invalid email adress")
})
console.log(test);

// test.isValid()