import api from '../'
const gravatar = require('gravatar');

export function getUserEntries() {
  return api('get', 'user-entries')
}

export function createUserEntry(values) {
  const { no, type, name, email, password } = values
  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm'
})
  return api('post', 'user-entries', { no, type, name, email, password, avatar })
}

export function getUserEntry(id) {
  return api('get', `user-entries/userID/${id}`)
}

export function logUserEntry(email, password) {
  return api('get', `user-entries/email/${email},${password}`)
}

export function updateUserEntry(id, values) {
  const { no, type, name, email, password } = values
  return api('put', `user-entries/userID/${id}`, { no, type, name, email, password })
}

export function deleteUserEntry(id) {
  return api('delete', `user-entries/${id}`)
}