import React from 'react'
import '../../index.css'

function renderNone(loaded) {
  return <tr>
    <td colSpan={3}>
      { loaded
        ? "There are no patient entries to display"
        : "Loading..."
      }
    </td>
  </tr>
}

function renderEntries(entries) {
  return entries.map(entry => <tr title={'Edit patient'} onClick={() => window.location=`/patient-entries/${entry._id}/edit`} cellSpacing={0} key={entry._id}>
    <td>{ entry.no }</td>
    <td>{ entry.name }</td>
    <td>{ entry.type }</td>
    <td>{ entry.address }</td>
    <td>{ entry.phone }</td>
    <td>{ entry.email }</td>
  </tr>)
}

export default function PatientEntryTable({ entries, loaded }) {
  return <table width="100%">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Type</th>
        <th>Address</th>
        <th>Phone</th>
        <th>Email</th>
      </tr>
    </thead>

    <tbody>
      {
          entries 
            ? renderEntries(entries) 
            : renderNone(loaded)
        //entries.length > 0 ? renderEntries(entries) : renderNone(loaded)
      }
    </tbody>
  </table>

}