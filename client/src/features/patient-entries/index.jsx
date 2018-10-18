import React from 'react'
import { connect } from 'react-redux'

import { getPatientEntries } from '../../api/patient-entries'

import PatientEntryTable from './table'

class PatientEntries extends React.Component {
  componentDidMount() {
    const { persistPatientEntries } = this.props
    getPatientEntries().then(json => persistPatientEntries({ entries: json, loaded: true }))
  }

  render() {
    const { entries, loaded, persistPatientEntries } = this.props
    return <div>
      <h1 style={{color: '#8fcbff'}}>All Patients</h1>
      <PatientEntryTable persistPatientEntries={persistPatientEntries} entries={entries} loaded={loaded} />
    </div>
  }
}

function mapStateToProps(state) {
  return {
    entries: state.patientEntries.entries
  }
}

function mapDispatchToProps(dispatch) {
  return {
    persistPatientEntries: (payload) => {
      dispatch({ type: 'LOAD', payload })

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientEntries)