import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getPatientEntry, deletePatientEntry } from '../../api/patient-entries'

class ShowPatientEntry extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params

    id 
        ? getPatientEntry(id).then(json => {
            this.props.persistPatientEntry({ entry: json })
          }) 
        : alert('id undefined: ' + id)
  }

  renderEntry() {
    const { patientEntry: { _id, no, type, name, address, phone, email }, history } = this.props
    return <div>
      <div><Link to={`/patient-entries/${_id}/edit`}>Edit</Link></div>
      <div>
        <Link to={`/patient-entries/${_id}/edit`}>Edit</Link> | 
        <a href="#delete" onClick={() => {
          if (window.confirm(`Are you sure you want to delete this patient record? (${_id})`)) {
            deletePatientEntry(_id)
            history.push(`/home`)
          }
        }}>Delete</a>
      </div>
      <div><strong>ID</strong> { no }</div>
      <div><strong>Type</strong> { type }</div>
      <div>
        <label>Name</label>
        <ol>
        {
          name.split("\n").map(name => <li>{ name }</li>)
        }
        </ol>
      </div>
      <div>
        <label>Address</label>
        <ol>
        {
          address.split("\n").map(address => <li>{ address }</li>)
        }
        </ol>
      </div>
      <div>
        <label>Phone</label>
        <ol>
        {
          phone.split("\n").map(phone => <li>{ phone }</li>)
        }
        </ol>
      </div>
      <div>
        <label>Email</label>
        <ol>
        {
          email.split("\n").map(step => <li>{ step }</li>)
        }
        </ol>
      </div>
    </div>
  }

  render() {
    const { patientEntry } = this.props
    return <div>
      <h1>New Patient Entry</h1>

      { patientEntry ? this.renderEntry() : 'Loading..'}
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowPatientEntry)