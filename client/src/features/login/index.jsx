import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logUserEntry } from '../../api/user-entries'
import LoginForm from './form'
import { store } from '../../config/store'

var name, avatar

function submitForm(values, props) {
  //const { persistUserEntry } = props

  logUserEntry(values.email, values.password).then(json => {
    //persistUserEntry({ entry: json })
    var data = json
    name = data['name']
    avatar = data['avatar']

    store.dispatch({
        type: 'NAVIGATE',
        payload: {
            navHistory: '/home'
        }
    })
    store.dispatch({

        type: 'USER_LOGIN',
        payload: {
            username: name,
            useravatar: avatar
        }
      })
    props.history.push('/home')
    //json.email
    //    ? props.history.push(`/user-entries/${json.email}`)
    //    : props.history.push('/users')
  })
}

class LoginUser extends React.Component {
  render() {
    return <div>
      <LoginForm
        onSubmit={(values) => submitForm(values, this.props)}
      />
    </div>
  }
}

function mapStateToProps(state) {
  return {
    //userEntry: state.userEntries.entry,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    persistUserEntry: (payload) => {
      dispatch({ type: "LOAD", payload })
      dispatch({type: 'NAVIGATE', payload: {
        navHistory: '/users'}})
      dispatch({

        type: 'USER_LOGIN',
        payload: {
            username: name,
            useravatar: avatar
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginUser)

