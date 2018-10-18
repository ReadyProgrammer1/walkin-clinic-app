import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { store } from '../config/store'
import Login from '../features/login'

import PatientEntries from '../features/patient-entries'
import CreatePatientEntry from '../features/patient-entries/create'
import ShowPatientEntry from '../features/patient-entries/show'
import EditPatientEntry from '../features/patient-entries/edit'

import UserEntries from '../features/user-entries'
import CreateUserEntry from '../features/user-entries/create'
import ShowUserEntry from '../features/user-entries/show'
import EditUserEntry from '../features/user-entries/edit'

const Router = () => (
  <Switch>
    <Route exact path='/login' component={Login} />
    <Route exact path='/' component={Login} />
    {
        store.getState().navbar.navLoggedin === false
          ? <Route exact path='/' component={Login} />
          : <Route exact path='/home' component={PatientEntries} />
    }
    <Route exact path='/home' component={PatientEntries} />
    <Route exact path='/patient-entries/new' component={CreatePatientEntry} />
    <Route exact path='/patient-entries/:id' component={ShowPatientEntry} />
    <Route exact path='/patient-entries/:id/edit' component={EditPatientEntry} />

    <Route exact path='/users' component={UserEntries} />
    <Route exact path='/user-entries/new' component={CreateUserEntry} />
    <Route exact path='/user-entries/:id' component={ShowUserEntry} />
    <Route exact path='/user-entries/:id/edit' component={EditUserEntry} />
  </Switch>
)

export default Router