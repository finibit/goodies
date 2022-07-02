# `@finibit/types`

Dynamic type checking utilities for JavaScript.

## Introduction

The `@finibit/types` package provides various functions for checking and ensuring dynamic types of JavaScript values.

## Installation

Using NPM:

```shell
npm i @finibit/types
```

## Usage

```js
import { ensureArray, ensureFunction } from '@finibit/types'

function map (arr, fn) {
  ensureArray(arr)
  ensureFunction(fn)  
  return arr.map(fn)
}
```

## API

### `isNull(v)`

Checks whether `v` is `null`.

```js
import { isNull } from '@finibit/types'

isNull(null) === true
```

### `isUndefined(v)`

Checks whether `v` is `undefined`.

```js
import { isUndefined } from '@finibit/types'

isUndefined() === true
isUndefined(undefined) === true
```

### `isBoolean(v)`

Checks whether `v` is either `true` or `false`.

```js
import { isBoolean } from '@finibit/types'

isBoolean(true) === true
isBoolean(false) === true
```

### `isInteger(v)`

Checks whether `v` is an integer using `Number.isSafeInteger`.

```js
import { isInteger } from '@finibit/types'

isInteger(1) === true
isInteger(0.1) === false
isInteger(NaN) === false
isInteger(Infinity) === false
````

### `isNumber(v)`

Checks whether `v` is a number, excluding infinite values.

```js
import { isNumber } from '@finibit/types'

isNumber(1) === true
isNumber(NaN) === false
isNumber(Infinity) === false
```

### `isString(v)`

Checks whether `v` is a string, excluding `String` object.

```js
import { isString } from '@finibit/types'

isString('') === true
```

### `isArray(v)`

Checks whether `v` is an array using `Array.isArray`.

```js
import { isArray } from '@finibit/types'

isArray([]) === true
```

### `isFunction(v)`

Checks whether `v` is a function.

```js
import { isFunction } from '@finibit/types'

isFunction(() => null) === true
```

### `isObject(v)`

Checks whether `v` is a non-null object or a [function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function).

```js
import { isObject } from '@finibit/types'

isObject({}) === true
isObject([]) === true
isObject(() => null) === true
isObject(null) === false
isObject('') === false
```

### `isSymbol(v)`

Checks whether `v` is a `Symbol`.

```js
import { isSymbol } from '@finibit/types'

isSymbol(Symbol('test')) === true
```

### `isIterable(v)`

Checks whether `v` is iterable, e.g. implements the [iterable protocol](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol)

```js
import { isIterable } from '@finibit/types'

isIterable('') === true
isIterable([]) === true
isIterable({}) === false
```

### `isPromise(v)`

Checks whether `v` is promise-like, e.g. implements `then` method.

```js
import { isPromise } from '@finibit/types'

isPromise(Promise.resolve()) === true
isPromise({ then: () => null }) === true
```

### `ensure*(v)`

Additionally, every `is*` function has a `ensure*` counterpart, which throw `TypeError` exceptions if `v` is not a correct type.

```js
import { ensureIterable } from '@finibit/types'

ensureIterable(null) // throws TypeError('Expected iterable but got null')
```

### `typeOf(v)`

Similarly to `typeof` operator, returns the type of `v`. It handles several special cases:

```js
import { typeOf } from '@finibit/types'

typeOf(null) === 'null'
typeOf(NaN) === 'NaN'
typeOf(Infinity) === 'infinity'
```
