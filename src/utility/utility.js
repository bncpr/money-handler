export const capitalizeFirstChar = string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`
export const updateObj = (obj, newObj) => {
  return { ...obj, ...newObj }
}
export const isEmptyObj = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}

export function getMinKey(obj) {
  return '' + Math.min(...Object.keys(obj))
}

export function getMaxKey(obj) {
  return '' + Math.max(...Object.keys(obj))
}

export function sortStrings(array) {
  return array.sort(stringSorter)
}

export function stringSorter(operand = 1) {
  // -1 == reverse order
  return (a, b) => {
    if (a > b) return 1 * operand
    if (a < b) return -1 * operand
  }
}