

const stringValidation = (value) => {
    if (value.length === 0) throw Error('Type in proper value.')
}

const emailValidaiton = (testingEmail) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(re.test(testingEmail) !== true) throw Error('Type in correct email adress')
}

export {stringValidation, emailValidaiton}