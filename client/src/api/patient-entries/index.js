import api from '../'

export function getPatientEntries() {
  return api('get', 'patient-entries')
}

export function createPatientEntry(values) {
  const { no, type, name, address, phone, email } = values
  return api('post', 'patient-entries', { no, type, name, address, phone, email })
}

export function getPatientEntry(id) {
  return api('get', `patient-entries/${id}`)
}

export function updatePatientEntry(id, values) {
  const { no, type, name, address, phone, email } = values
  return api('put', `patient-entries/${id}`, { no, type, name, address, phone, email })
}

export function deletePatientEntry(id) {
  return api('delete', `patient-entries/${id}`)
}