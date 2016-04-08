# GeneratorPOC
Proof of Concept of using generators instead of async/await from babel

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
