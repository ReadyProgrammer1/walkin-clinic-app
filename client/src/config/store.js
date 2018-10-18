import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import patientEntriesReducer from '../features/patient-entries/reducer'
import userEntriesReducer from '../features/user-entries/reducer'
import navbarReducer from '../features/navbar/reducer'
import userReducer from '../features/login/userReducer'

const rootReducer = combineReducers({
  patientEntries: patientEntriesReducer,
  userEntries: userEntriesReducer,
  form: formReducer,
  navbar: navbarReducer,
  user: userReducer
})

const persistConfig = {
    key: 'root',
    storage,
  }
  
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export const persistor = persistStore(store)
