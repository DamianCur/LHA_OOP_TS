type switchCallback = () => void

class Switch {
    conditionsArray: boolean[]
    callbackArray: Array<switchCallback> // switchCallback[]

    constructor() {
        this.conditionsArray = []
        this.callbackArray = []
    }

    add(condition: boolean, callback: switchCallback) {
        this.conditionsArray.push(condition)
        this.callbackArray.push(callback)
    }

    isValid() {
        const result = this.conditionsArray.every((condition, index) => {
            if (condition) {
                const callback = this.callbackArray[index]
                callback()
            }
            return !condition
        })
        
        return result
    }
    isEmpty() {
        return this.conditionsArray.length === 0 || this.callbackArray.length === 0
    }
}

const test = new Switch()
const value = "abc.abc.com"

console.log(test);

test.add(!value.includes("@"), () => {
    console.log("Invalid email adress")
})

// test.isValid()