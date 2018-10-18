import React from 'react'

import { store } from './config/store'
import Router from './config/router'
import Navbar from './features/navbar'


class App extends React.Component {
  
  render(props) {
    return <div className="content">
    {
      store.getState().navbar.navLoggedin === false
        ? <div><Router /></div>
        : <div><Navbar /><Router /></div>
    }
    </div>
  }
}

export default App