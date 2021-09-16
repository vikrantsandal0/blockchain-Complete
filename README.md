# BLOCKCHAIN API'S ASSIGNMENT
* A simple module written in Node.js, React.js to fetch data from blockchain.info API's and display it.
### Tech-stack used
* Express.js - a back end web application framework for Node.js.
* React.js - a free and open-source front-end JavaScript library.
* Redis - In-memory caching solution used for fast access to API responses.
* Axios - Promise based HTTP client for the browser and node.js.
* Joi - powerful schema description language and data validator for JavaScript.
* Chai - an assertion library for Node.js,makes testing much easier.
* Mocha - JavaScript test framework running on Node.js.
* Mochawesome - a custom reporter for use with the Javascript testing framework, mocha.
* Bable - a toolchain used to convert ECMAScript 2015+ code into a backward-compatible version of JavaScript.


### The complete module can be divided into two main parts:
## BE
* An Express.js backend app written completely in es6 with the help of babel having Redis as caching mechanism.
* follows Middleware design pattern with validators and Cache as middlewares.
* fetches data from blockchain.info API's, massages the result , cache's it if necessary and sends the paginated response back to FE module.
* Tests basic flows using sinon, mocha , chai.

## FE
* A React.js frontend app created using small functional components, using modern react hooks.
* Lists blocks using pagination and displays important details of each block along with the latest transactions in a paginated manner.



### BE MODULE'S API's
```
/api/v1/getBlocks?page=1
fetches all blocks for yesterday and sends the paginated result.
```
```
/api/v1/getRawBlock/:block_hash_id
fetches details,transactions for a block and sends the paginated result.
```

####  Caching middleware implementation (Cache-aside (Lazy-loading))
* After observing the results of blockchain.info we decided to Cache the result in redis, especially for **getRawBlock** API , the transactions fetched are very high in number , therefore its not practical to hit such completex and expensive API again and again.
* We have used Redis as a middleware which is key/value store that we can use as a cache for our most frequently used data. We can use it as an alternative to forcing every single API call to hit blockchain.info APIs which is an expensive hit. Hence we store our API results into Redis using Redis's SET and ttl and let it manage how much memory is used for this and expire out the old data. 
* Our Redis checkCache.js middleware looking into the incoming request, creates a redis key for it, check if there's already some data stored corresponding to key which hasn't expired and returns it, which significantly reduces the response time of our API, hence in this way Offloading responsibilities from the application’s main logic to the caching layer frees up compute resources to process more incoming requests.
* For the **getBlocks** API the redis expiry time is 1h (3600secs) as data isnt changing very frequentely and for the 
**getRawBlock** API its 10m (600 secs) as its vital that user sees updated transactions as soon as possible.

####  Pagination logic setup on BE.
 * For our APP, we have used Server Side Pagination where the server in which the data is hosted only returns a subset of the data requested by the Client.The rationale behind Server Side Pagination is Complex data set, large data set and large interaction.The initial UI load will be lightning quick and the client continues to request for
 more data , we can serve it from our  redis cache.


 ### FOLDER STRUCTURE
 ## BE
 * server.js - being the entry point
 * routes -> contains the API routes.
 * middleware - contains our 2 middlewares to be used for routes
 * controller - contains the main implementation of two API's
 * test - contains the test cases , coverage, mocha reports etc.
 * util - contains the utility funcs such as redis, loggers etc.

 ## FE
 * index.js - being the entry point
 * pages  - contains the functional components for both blocks listing and details .
 * hooks  - contains a custom hook created to fetch data from server.
 * components - contains resuable components to be used in pages.
 

### HOW TO INITIATE 
```
npm install

on both BE/FE
```
```
redis-server

intialise the redis server
```
```
run BE  - npm run start
run FE - npm start
```

### POSTMAN
[link](https://www.getpostman.com/collections/dd2bea693ddb79052cdb)

### images for reference
* **FRONTEND**
<img width="1789" alt="Screenshot 2021-09-16 at 12 13 11 PM" src="https://user-images.githubusercontent.com/38485799/133563269-3125780a-be3c-4d99-81de-7457730ea244.png">
<img width="1762" alt="Screenshot 2021-09-16 at 12 13 37 PM" src="https://user-images.githubusercontent.com/38485799/133563291-37614e27-20b1-460c-b2d9-37d9c38a64b0.png">

* **MIDDLEWARE DESIGN PATTERN**
![1_dWMuOSIJsuU27gZfuxJwRQ](https://user-images.githubusercontent.com/38485799/97068549-0f66f880-15e6-11eb-8021-35f848500bda.png)<br /><br /><br /><br /><br /><br />

* **CACHING APPROACH**
![Screenshot from 2020-10-24 10-44-28](https://user-images.githubusercontent.com/38485799/97068545-0b3adb00-15e6-11eb-97fe-972e0105e9fc.png)<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />



## Authors

* **Vikrant Sandal** 


