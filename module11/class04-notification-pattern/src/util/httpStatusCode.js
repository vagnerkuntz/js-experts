import { STATUS_CODES } from 'node:http'

const normalizeHttpErrorName = (name) => name.toUpperCase().replace(/\s/g, '_')

export const statusCodes = Object.keys(STATUS_CODES)
    .map(code => ({ [normalizeHttpErrorName(STATUS_CODES[code])]: parseInt(code, 10) }))
    .reduce((prev, next) => ({ ...prev, ...next }), {})
