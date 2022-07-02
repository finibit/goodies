import { typeOf, isIterable, isObject, ensureFunction, ensureIterable, ensureObject } from '@finibit/types'

/**
 * Calls `iteratee` for each entry of `map`.
 * @param {Map} map A map to iterate over.
 * @param {Function} iteratee A function to call for each entry of `map`.
 * @throws TypeError Throws if `map` is not an instance of `Map`, or `iteratee` is not a function.
 */
export function iterateMap (map, iteratee) {
  iteratee = ensureFunction(iteratee)

  if (!(map instanceof Map)) {
    throw TypeError(`Expected Map instance, got ${typeOf(map)}`)
  }

  for (const [key, value] of map) {
    iteratee(value, key, map)
  }
}

/**
 * Calls `iteratee` for each element of `iterable`.
 * @param {Array|String|Set} iterable An iterable to iterate over.
 * @param {Function} iteratee A function to call for each element of `iterable`.
 * @throws TypeError Throws if `iterable` does not implement iterable protocol, or `iteratee` is not a function.
 */
export function iterateIterable (iterable, iteratee) {
  iterable = ensureIterable(iterable)
  iteratee = ensureFunction(iteratee)

  let index = 0
  for (const elem of iterable) {
    iteratee(elem, index, iterable)
    ++index
  }
}

/**
 * Calls `iteratee` for each own property of `object`.
 * @param {Object} object An object to iterate over.
 * @param {Function} iteratee A function to call for each property of `object`.
 * @throws TypeError Throws if `object` is not an object, or `iteratee` is not a function.
 */
export function iterateObject (object, iteratee) {
  object = ensureObject(object)
  iteratee = ensureFunction(iteratee)

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      iteratee(object[key], key, object)
    }
  }
}

/**
 * Calls `iteratee` for each element of `value`.
 * @param {Array|String|Set|Map|Object} any An object to iterate over.
 * @param {Function} iteratee A function to call for each element.
 * @throws TypeError Throws if `value` is not iterable, or `iteratee` is not a function.
 */
export default function iterate (any, iteratee) {
  if (isIterable(any)) {
    if (any instanceof Map) {
      return iterateMap(any, iteratee)
    }
    return iterateIterable(any, iteratee)
  } else if (isObject(any)) {
    return iterateObject(any, iteratee)
  }

  throw TypeError(`Expected iterable or object, got ${typeOf(any)}`)
}
