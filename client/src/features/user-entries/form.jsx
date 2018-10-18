import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { deleteUserEntry } from '../../api/user-entries'
import { store } from '../../config/store'

function validate(values) {
  const errors = {}
  const { no, type, name, email, password } = values
  if (!no) errors.no = 'required'
  if (!type) errors.type = 'required'
  if (!name) errors.name = 'required'
  if (!email) errors.email = 'required'
  if (!password) errors.password = 'required'
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

function UserEntryForm(props) {
  const { handleSubmit, submitting, valid } = props
  return <form onSubmit={handleSubmit}>
    <Field name="no" component={renderInput} type="text" label="ID" />
    <Field name="type" component={renderInput} type="text" label="Type" />
    <Field name="name" component={renderTextArea} label="Name" rows={1} />
    <Field name="email" component={renderTextArea} label="Email" rows={1} />
    <Field name="password" component={renderTextArea} label="Password" rows={1} />
    <div>
      <button
        type="submit"
        className="primary"
        disabled={!valid || submitting}
      >Save</button>
      <button
        type="button"
        className="secondary"
        onClick={() => props.history.push('/users')}
      >Cancel</button>
      <a href="#delete" 
        onClick={() => {
          const id = store.getState().userEntries.entry._id
          if (window.confirm(`Are you sure you want to delete this user? (${id})`)) {
            deleteUserEntry(id)
            props.history.push(`/users`)
          }
        }}
        style={store.getState().userEntries.entry === undefined ? {visibility: 'hidden'} : {}}
        >Delete</a>
    </div>
  </form>
}

const withForm = reduxForm({ form: 'userEntry', validate })(UserEntryForm)
const withRedux = connect(
  state => ({
    initialValues: state.userEntries.entry
  })
)(withForm)

export default withRouter(withRedux)