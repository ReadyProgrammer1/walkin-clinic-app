import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { deletePatientEntry } from '../../api/patient-entries'
import { store } from '../../config/store'

function validate(values) {
  const errors = {}
  const { no, type, name, address, phone, email } = values
  if (!no) errors.no = 'required'
  if (!type) errors.type = 'required'
  if (!name) errors.name = 'required'
  if (!address) errors.address = 'required'
  if (!phone) errors.phone = 'required'
  if (!email) errors.email = 'required'
  return errors
}

function renderInput({input, label, type, meta: { touched, error }}) {
  return <div>
    <label>{label}{touched && ((error && <span className="error">({error})</span>))}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      
    </div>
  </div>
}

function renderTextArea({input, label, type, rows, meta: { touched, error }}) {
  return <div>
    <label>{label}{touched && ((error && <span className="error">({error})</span>))}</label>
    <div>
      <textarea {...input} placeholder={label} rows={rows} />
    </div>
  </div>
}

function PatientEntryForm(props) {
  const { handleSubmit, submitting, valid } = props
  return <form onSubmit={handleSubmit}>
    <Field name="no" component={renderInput} type="text" label="ID" />
    <Field name="type" component={renderInput} type="text" label="Type" />
    <Field name="name" component={renderTextArea} label="Name" rows={1} />
    <Field name="address" component={renderTextArea} label="Address" rows={3} />
    <Field name="phone" component={renderTextArea} label="Phone" rows={1} />
    <Field name="email" component={renderTextArea} label="Email" rows={2} />

    <div>
      <button
        type="submit"
        className="primary"
        disabled={!valid || submitting}
      >Save</button>
      <button
        type="button"
        className="secondary"
        onClick={() => props.history.push('/home')}
      >Cancel</button>
      <a href="#delete" 
        onClick={() => {
          const id = store.getState().patientEntries.entry._id
          if (window.confirm(`Are you sure you want to delete this patient? (${id})`)) {
            deletePatientEntry(id)
            props.history.push(`/home`)
          }
        }}
        style={store.getState().patientEntries.entry === undefined ? {visibility: 'hidden'} : {}}
        >Delete</a>
    </div>
  </form>
}

const withForm = reduxForm({ form: 'patientEntry', validate })(PatientEntryForm)
const withRedux = connect(
  state => ({
    initialValues: state.patientEntries.entry
  })
)(withForm)

export default withRouter(withRedux)