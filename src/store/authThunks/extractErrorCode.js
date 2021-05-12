const re = /\/((?:\w+-*)+)/
const keyRe = /email|password|user/
const stripHyphen = match => match[1].replaceAll("-", " ")
const reUserToMail = match => match[0].replace("user", "email")

export const extractErrorCode = code => {
  const key = code.match(keyRe)
  const value = code.match(re)
  return key && value
    ? { key: reUserToMail(key), value: stripHyphen(value) }
    : { key: "other", value: value ? stripHyphen(value) : "error" }
}
