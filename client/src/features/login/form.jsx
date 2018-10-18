import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { logUserEntry } from '../../api/user-entries'
import tree from '../../features/tree.png'

function validate(values) {
    const errors = {}
    const { email, password } = values
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

function LoginForm(props) {
    
    const login = () => {

        const { id } = this.props.match.params
        logUserEntry(id).then(json => {
            this.props.persistUserEntry({ entry: json })
        })
        props.history.push('/')
    }
    
    const { handleSubmit, submitting, valid } = props
    return <div><div>
        <img src={tree} alt='Aspen Clinic' title='Aspen Clinic'
                style={{ width: '25px', marginRight: '5px', float: 'left'}} />
        <p style={{float: 'left'}}><font style={{fontSize: '18pt'}}>Aspen Clinic Portal</font></p></div>
        <form onSubmit={handleSubmit}>
        <Field name="email" component={renderTextArea} label="Email" rows={1} />
        <Field name="password" component={renderInput} type="text" label="Password" />
        <div><br />
        <button
        type="submit"
        className="primary"
        disabled={!valid || submitting}
      >Log in</button>
        </div>
    </form></div>

}

const withForm = reduxForm({ form: 'loginForm', validate })(LoginForm)
const withRedux = connect(
  state => ({
    //initialValues: state.login.entry
  })
)(withForm)

export default withRouter(withRedux)