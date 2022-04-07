import Cookies from 'js-cookie'
import day from 'dayjs'

const TokenKey = 'x-access-token'
const inFifteenMinutes = day(day().millisecond() + 120 * 60 * 1000).toDate()
export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token: string) {
  return Cookies.set(TokenKey, token, { expires: inFifteenMinutes })
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
