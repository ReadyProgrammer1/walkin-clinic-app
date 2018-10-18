import React from 'react'
import { connect } from 'react-redux'

import { updateUserEntry, getUserEntry } from '../../api/user-entries'
import UserEntryForm from './form'

function submitForm(values, props) {
  const { persistUserEntry } = props
  updateUserEntry(props.match.params.id, values).then(json => {
    persistUserEntry({ entry: json })
    json.id
        ? props.history.push(`/user-entries/${json.id}`)
        : props.history.push('/users')
  })
}

class EditUserEntry extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params
    getUserEntry(id).then(json => {
      this.props.persistUserEntry({ entry: json })
    })
  }

  render() {
    return <div>
      <h1 style={{color: '#8fcbff'}}>Edit User Information</h1>

      <UserEntryForm
        onSubmit={(values) => submitForm(values, this.props)}
      />
    </div>
  }
}


function mapStateToProps(state) {
  return {
    userEntry: state.userEntries.entry,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    persistUserEntry: (payload) => {
      dispatch({ type: "LOAD", payload })
      dispatch({type: 'NAVIGATE', payload: {
        navHistory: '/users'}})

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserEntry)