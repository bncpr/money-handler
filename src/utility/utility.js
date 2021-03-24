export const capitalizeFirstChar = string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`
export const updateObj = (obj, newObj) => {
  return { ...obj, ...newObj }
}