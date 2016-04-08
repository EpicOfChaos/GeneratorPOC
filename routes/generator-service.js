//This is a way to do a "private" method. . . this confuses me.
function promiseMethod1(value) {
    let promise = new Promise((resolve, reject) =>{
        if(value === 'y'){
            reject('Cannot handle "y"')
        }else{
            resolve('SUCCESS Promise Method 1 "' + value + '"')
        }
    })
    return promise
}

function promiseMethod2(value){
    let promise = new Promise((resolve, reject) =>{
        if(value === 'x'){
            reject('Cannot handle "x"')
        }else{
            resolve('SUCCESS Promise Method 2 "' + value + '"')
        }
    })
    return promise
}

class GeneratorService {
    constructor(){

    }

    * generatorMethod(val1, val2) {
        let message1 = yield promiseMethod1(val1)
        let message2 = yield promiseMethod2(val2)
        return [message1, message2]
    }
}

let instance = new GeneratorService()

module.exports = {
    instance: instance
}