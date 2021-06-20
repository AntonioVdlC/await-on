# await-on

[![version](https://img.shields.io/npm/v/@antoniovdlc/await-on.svg)](http://npm.im/@antoniovdlc/await-on)
[![issues](https://img.shields.io/github/issues-raw/antoniovdlc/await-on.svg)](https://github.com/AntonioVdlC/await-on/issues)
[![downloads](https://img.shields.io/npm/dt/@antoniovdlc/await-on.svg)](http://npm.im/@antoniovdlc/await-on)
[![license](https://img.shields.io/npm/l/@antoniovdlc/await-on.svg)](http://opensource.org/licenses/MIT)

Go-like error handling for async JavaScript functions.

## Installation

This package is distributed via npm:

```
npm install @antoniovdlc/await-on
```

## Motivation

Async functions in JavaScript are great! They allow you to write asynchronous code as if it were synchronous. 

The main drawback I personally experience is having to write code like this:
```js
try {
  const result = await someFunc()
  // Do something with `result`
} catch (err) {
  // Handle error
}
```

Having had some past experience using Go, and after some time to fully understand the elegance of its simplistic error handling approach, it felt right to try to replicate it:
```go
result, err := someFunc();
if err != nil {
  // Handle error
}
// Do something with `result`
```

This is why this package exists, so that we can write asynchronous JavaScript code in a style as close as possible to that of Go:
```js
const [result, err] = await on(someFunc)
if (err != null) {
	// Handle error
}
// Do something with `result`

```

## Usage

You can use this library either as an ES module or a CommonJS package:
```js
import on from "@antoniovdlc/await-on";
```
*- or -*
```js
const on = require("@antoniovdlc/await-on");
```

The return is formatted as follow:

```js
const [result, error] = await on(someFunc)
```

In the case where `someFunc()` throws an error, the function call will return `[null, error]`, else, it will return the computed `result` and `error` will be `null`.

You can pass the following arguments to `on()`:
- T
- Promise<T>
- Function
- Array<Promise<T> | Function>

## Examples

The following examples always populate `result` with the value `42` and `error` with `null`:
```js
const value = 42;
const [result, error] = await on(value);
```
```js
const promise = new Promise(resolve => resolve(42));
const [result, error] = await on(promise); 
```
```js
const fn = () => 42;
const [result, error] = await on(fn); 
```

The following examples always set `result` to `null` and `error` to an `Error`:
```js
const someError = new Error("Some Error");
const [result, error] = await on(someError);
```
```js
const promise = new Promise((_, reject) => reject("Some Error"));
const [result, error] = await on(someError);
```
```js
const someError = new Error("Some Error");
const fn = () => {
  throw someError;
};
const [result, error] = await on(fn);
```
  
As an extra goodie, you can also pass an `Array`:
```js
const value = 42;
const promise = new Promise(resolve => resolve(42));
const fn = () => 42;

const [result, error] = await on([promise, fn, value]);
console.log(result); // [42, 42, 42]
```
You can even go into destructuring overdrive!
```js
const [[r1, r2], error] = await on([promise1, promise2])
```
> Note that the whole call to `on()` will return an `error` if one of the elements of the Array either throws or rejects.

## Previous Art

Besides getting inspiration from Go's error handling, this package also draws inspiration from the following packages:
- [await-to-js](https://www.npmjs.com/package/await-to-js)
- [await-on](https://www.npmjs.com/package/await-on)
- ... and many more!
  
## FAQ
  
### Why not use any of the existing packages?

Good you ask! 

There is probably a bit of selfishness in the belief that maybe I can implement this in a better way, but the main reason is to see if I can implement such a library and maybe add some goodies on top.

This code, even though thoroughly tested with 100% code coverage, has not ran in production yet. As such, either you feel adventurous, or I would invite you to look for more mature libraries providing essentially the same functionalities (I've linked to a few I found myself right above, but there are many more).

Anyway, thanks for stopping by! :)
 
### Why returning an Array and not an Object?
  
Pretty much for the same reason React hooks (and many other libraries) return an Array (most of the time) and not an Object: it gives you the ability to name the destructured variables as you please!

## License
MIT