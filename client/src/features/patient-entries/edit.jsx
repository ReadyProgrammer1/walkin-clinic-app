import React from 'react'
import { connect } from 'react-redux'

import { updatePatientEntry, getPatientEntry } from '../../api/patient-entries'
import PatientEntryForm from './form'

function submitForm(values, props) {
  const { persistPatientEntry } = props
  updatePatientEntry(props.match.params.id, values).then(json => {
    persistPatientEntry({ entry: json })
    json.id
        ? props.history.push(`/patient-entries/${json.id}`)
        : props.history.push('/home')
  })
}

class EditPatientEntry extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params
    getPatientEntry(id).then(json => {
      this.props.persistPatientEntry({ entry: json })
    })
  }

  render() {
    return <div>
      <h1 style={{color: '#8fcbff'}}>Edit Patient Information</h1>

      <PatientEntryForm
        onSubmit={(values) => submitForm(values, this.props)}
      />
    </div>
  }
}


function mapStateToProps(state) {
  return {
    patientEntry: state.patientEntries.entry,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    persistPatientEntry: (payload) => {
      dispatch({ type: "LOAD", payload})

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPatientEntry)