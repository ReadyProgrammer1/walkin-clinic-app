
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import patientEntriesReducer from '../features/patient-entries/reducer'
import userEntriesReducer from '../features/user-entries/reducer'
import navbarReducer from '../features/navbar/reducer'
import userReducer from '../features/login/userReducer'

const appReducer = combineReducers({
    patientEntries: patientEntriesReducer,
    userEntries: userEntriesReducer,
    form: formReducer,
    navbar: navbarReducer,
    user: userReducer
});
  
let defaultState = null;
export default (state, action) => {
switch (action.type) {
    case appActions.ON_APP_LOAD:
    defaultState = defaultState || state;
    break;
    case userLoginActions.USER_LOGOUT:
    state = defaultState;
    return state;
    default:
    break;
}
return appReducer(state, action);
};