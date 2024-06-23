export function sanitizeRegex(value: string, replaceWith = "\\$&") {
  return value.replaceAll(" ", "")
    // eslint-disable-next-line no-useless-escape
    .replace(/[\\\.\+\*\?\^\$\[\]\(\)\{\}\/\'\#\:\!\=\|]/ig, replaceWith)
}