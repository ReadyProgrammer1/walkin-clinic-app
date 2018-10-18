const userEntriesReducer = (state={
    entries: [],
    entry: null,
    loaded: false,
  }, action) => {
    switch(action.type) {
      case 'LOAD':
        return action.payload
  
      default:
        return state
    }
  }
  
  export default userEntriesReducer