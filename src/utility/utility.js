export const capitalizeFirstChar = string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`
export const updateObj = (obj, newObj) => {
  return { ...obj, ...newObj }
}
export const isEmptyObj = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}