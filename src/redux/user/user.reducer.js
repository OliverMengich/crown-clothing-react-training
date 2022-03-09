const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) =>{
    //switch statement
    switch (action.type) {
        case 'SET_CURRENT_USER': //if action type is to change the current user, change it. if nothing is to be change, return the default
            return{
                ...state,
                currentUser: action.payload
            }
    
        default:
            return state;
    }
}
export default userReducer;