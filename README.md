# easy-ms

[![Build Status](https://travis-ci.org/tanhauhau/easy-ms.js.svg?branch=master)](https://travis-ci.org/tanhauhau/easy-ms.js)
[![npm version](https://badge.fury.io/js/easy-ms.svg)](https://badge.fury.io/js/easy-ms)
[![Dependency status](https://david-dm.org/tanhauhau/easy-ms.svg)](https://david-dm.org)
[![Downloads](https://img.shields.io/npm/dt/easy-ms.svg)](https://www.npmjs.com/package/easy-ms)
[![Donate](https://img.shields.io/gratipay/user/tanhauhau.svg)](https://gratipay.com/~tanhauhau/)

> Easy and human friendly millisecond implementation that you will definitely love it

# Installation

```bash
$ npm install --save easy-ms
```

## Usage

It's easy and versatile. Below show examples of how to return 90,000 milliseconds.

```javascript
var ms = require('easy-ms');

//the simple
ms(90000) // ms(ms)
ms(90, 0) // ms(s, ms)
ms(1, 30, 0) // ms(m, s, ms)
ms(0, 1, 30, 0) // ms(h, m, s, ms)
ms(0, 0, 1, 30, 0) // ms(d, h, m, s, ms)
ms(0, 0, 0, 1, 30, 0) // ms(y, d, h, m, s, ms)
ms(0, 0, 0.025, 0, 0, 0) // ms(y, d, h, m, s, ms)

//with string as well
ms('1m 30s') //1 minute 30 second
ms('1minute 30s') //1 minute 30 second
ms('1 min 30 sec') //1 minute 30 second
ms('1.5 min') //1 minute 30 second

//with object if you like it this way
ms({minute: 1, second: 30})
ms({min: 1, seconds: 30})
ms({m: 1, s: 30})
ms({m: 0.5, minute: 0.5, second: 15, s: 15}) //I don't know why you want to do it this way, but it is absolutely fine

//chain-able
ms('1m')
    .second(30)
ms(30, 0)
    .m(1)
ms({ms: 1000})
    .second(29)
    .m('1')

//chain-add
ms('1m')
    .s(5)               //chain 5 seconds
    .add('10 seconds')  //you still remember of using strings?
    .add({s: 5})        //or objects
    .add(5, 0)          //or just numbers?
    .second(5)          //it all works

//chain minus
ms('2m')
    .s(5)                 
    .minus('20 seconds')  //maybe you like to minus of some time
    .sub({s: 10})         //or sub?
    .subtract(10, 0)      //or subtract?
    .second(5)            //it's up to you.
```

We wish we could accept anything to be passed into easy-ms.

But below is a list of what does not work. They will return `NaN`

```js
ms('1m').second('abc')
ms('1b').hour(5)
ms({m: 'foo'})
```

# License
MIT
