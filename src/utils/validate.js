//匹配url地址
export function isURL(s) {
   return /^http[s]?:\/\/.*/.test(s)
}
