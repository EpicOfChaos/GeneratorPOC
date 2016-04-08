# GeneratorPOC
Proof of Concept of using generators instead of async/await from babel

---
## How does it work?
In the file generator-service.js there is a generator method that calls two other methods that return promises. The control flow looks like syncrhonous code but it is actually executing the promoses async and waiting.

```javascript
class GeneratorService {
    constructor(){

    }

    * generatorMethod(val1, val2) {
        let message1 = yield promiseMethod1(val1)
        let message2 = yield promiseMethod2(val2)
        return [message1, message2]
    }
}
```

These are the two promise functions, one is set to reject on y and the other on x.

```javascript
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
```

In order to execute the generator function I use [bluebird coroutine function.](http://bluebirdjs.com/docs/api/promise.coroutine.html)
```javascript
router.get('/testGenerator/:val1/:val2', (req, res) => {
  Promise.coroutine(generator.generatorMethod)(req.params.val1, req.params.val2).then((result) => {
    console.log('result ' + result)
    res.send(result)
  }).catch((err) =>{
    console.log('Unexpected Error! ' + err)
    res.status(500)
    res.send(err)
  })
})
```

##Why?

* Why would you want to use generator over standard callbacks? __The control flow of complex business logic is much easier to understand if it is written to represent sychronous execution IMO__.
* Why not just use Babel async/await? __Babel touches all aspects of the development process with node, it makes it very hard to debug and is just 'heavy' IMO__.

---
## Starting the server
Execute one of the follwoing from the command line.
```
npm start 
```
```
npm run start:dev
```
---
## Excercising the happy path
Open a browser and execute the following URL <http://localhost:3000/testGenerator/x/y>

Expected Output HTTP Status: 200
```
["SUCCESS Promise Method 1 \"x\"","SUCCESS Promise Method 2 \"y\""]
```
---
## Excercising the exception path
Open a browser and execute the following URL <http://localhost:3000/testGenerator/y/x>

The code is setup to reject a promise when the first parameter is 'y'

Expected Output HTTP Status: 500
```
Cannot handle "y"
```
