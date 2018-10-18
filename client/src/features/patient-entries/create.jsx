import React from 'react'
import { connect } from 'react-redux'

import { createPatientEntry } from '../../api/patient-entries'
import PatientEntryForm from './form'

function submitForm(values, props) {
  const { persistPatientEntry } = props

  createPatientEntry(values)
  props.history.push('/home')
}

function CreatePatientEntry(props) {
  return <div>
    <h1 style={{color: '#8fcbff'}}>Create New Patient Entry</h1>

    <PatientEntryForm
      onSubmit={(values) => submitForm(values, props)}
      {...props.patientEntry}
    />
  </div>
}

function mapStateToProps(state) {
  return {
    patientEntry: state.patientEntries.patientEntry,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    persistPatientEntry: (payload) => {
      dispatch({ type: "LOAD", payload})

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePatientEntry)