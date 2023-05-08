# **Node.js**

## **Introduction to Node.js**

**Node.js** - the server-side JavaScript runtime environment. 

Node.js is built on top of the **Google Chrome V8 JavaScript engine**, and it's mainly used to create web servers - but it's not limited to just that.

A Node.js app runs in a single process, without creating a new thread for every request. 

Node.js provides a set of asynchronous I/O primitives in its standard library that prevent JavaScript code from blocking and generally, libraries in Node.js are written using non-blocking paradigms, making blocking behavior the exception rather than the norm.

Node.js has a unique advantage because millions of frontend developers that write JavaScript for the browser are now able to write the server-side code in addition to the client-side code without the need to learn a completely different language.

## **Installation**
[Official website](https://nodejs.dev/en/)

## **Introducing asynchronous JavaScript**

**Asynchronous programming** is a technique that enables your program to start a potentially long-running task and still be able to be responsive to other events while that task runs, rather than having to wait until that task has finished. Once that task has finished, your program is presented with the result.

What we need is a way for our program to:

* Start a long-running operation by calling a function.
* Have that function start the operation and return immediately, so that our program can still be responsive to other events.
* Notify us with the result of the operation when it eventually completes.

That's precisely what asynchronous functions can do. 

### **Event handlers**

Event handlers are really a form of asynchronous programming: you provide a function (the event handler) that will be called, not right away, but whenever the event happens. If "the event" is "the asynchronous operation has completed", then that event could be used to notify the caller about the result of an asynchronous function call.

This is just like the event handlers we've encountered earlier, except that instead of the event being a user action, such as the user clicking a button, the event is a change in the state of some object.

### **Callbacks**

An event handler is a particular type of callback. A callback is just a function that's passed into another function, with the expectation that the callback will be called at the appropriate time. As we just saw, callbacks used to be the main way asynchronous functions were implemented in JavaScript.

Because we have to call callbacks inside callbacks, we get a deeply nested function, which is much harder to read and debug. This is sometimes called "callback hell" or the "pyramid of doom".

When we nest callbacks like this, it can also get very hard to handle errors.

For these reasons, most modern asynchronous APIs don't use callbacks. Instead, the foundation of asynchronous programming in JavaScript is the Promise.

### **setTimeout() global function**

The global setTimeout() method sets a timer which executes a function or specified piece of code once the timer expires.

[Read more](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)

### **Promise**

A Promise is an object representing the eventual completion or failure of an asynchronous operation

Essentially, a promise is a returned object to which you attach callbacks, instead of passing callbacks into a function. 

Advantages:

* Chaining - a common need is to execute two or more asynchronous operations back to back, where each subsequent operation starts when the previous operation succeeds, with the result from the previous step. In the old days, doing several asynchronous operations in a row would lead to the classic callback pyramid of doom. With promises, we accomplish this by creating a promise chain. The API design of promises makes this great, because callbacks are attached to the returned promise object, instead of being passed into a function.
* Nesting - control structure to limit the scope of catch statements
* Chaining after a catch - It's possible to chain after a failure, i.e. a catch, which is useful to accomplish new actions even after an action failed in the chain.

Promises solve a fundamental flaw with the callback pyramid of doom, by catching all errors, even thrown exceptions and programming errors. This is essential for functional composition of asynchronous operations.

### **async function**

The async function declaration declares an async function where the await keyword is permitted within the function body. The async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains.

 Await expressions make promise-returning functions behave as though they're synchronous by suspending execution until the returned promise is fulfilled or rejected. The resolved value of the promise is treated as the return value of the await expression. 
 
 Use of async and await enables the use of ordinary try / catch blocks around asynchronous code.

 ### **The event loop**

 JavaScript has a runtime model based on an event loop, which is responsible for executing the code, collecting and processing events, and executing queued sub-tasks. This model is quite different from models in other languages like C and Java.

 