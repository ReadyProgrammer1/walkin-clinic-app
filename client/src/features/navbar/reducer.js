const initialState = {
    navHistory: '',
    navLoggedin: null,
}

const navbarReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'NAVIGATE':
            var params = JSON.stringify(action.payload)
            var loggedIn 
            if (params.indexOf('login') !== -1) {
                loggedIn = false
            } else {
                loggedIn = true
            }
            return {
                navLoggedin: loggedIn,
                navHistory: action.payload
            }
        default: return state
    }
}
  export default navbarReducer