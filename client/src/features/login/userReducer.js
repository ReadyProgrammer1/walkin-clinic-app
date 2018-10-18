const initialState = {
    username: '',
    useravatar: ''
}

const userReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'USER_LOGIN':
            return {
                ...action.payload
            }
        default: return state
    }
}
  export default userReducer