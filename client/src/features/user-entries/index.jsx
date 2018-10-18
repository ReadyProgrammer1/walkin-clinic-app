import React from 'react'
import { connect } from 'react-redux'

import { getUserEntries } from '../../api/user-entries'

import UserEntryTable from './table'

class UserEntries extends React.Component {
  componentDidMount() {
    const { persistUserEntries } = this.props
    getUserEntries().then(json => persistUserEntries({ entries: json, loaded: true }))
  }

  render() {
    const { entries, loaded, persistUserEntries } = this.props
    return <div>
      <h1 style={{color: '#8fcbff'}}>All Users</h1>
      <UserEntryTable persistUserEntries={persistUserEntries} entries={entries} loaded={loaded} />
    </div>
  }
}

function mapStateToProps(state) {
  return {
    entries: state.userEntries.entries
  }
}

function mapDispatchToProps(dispatch) {
  return {
    persistUserEntries: (payload) => {
      dispatch({ type: 'LOAD', payload })

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEntries)