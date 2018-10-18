import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import './index.css'
import App from './App'

import { store, persistor } from './config/store'

require('dotenv').config()

const app = <Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </PersistGate>
</Provider>

ReactDOM.render(app, document.getElementById('root'))

