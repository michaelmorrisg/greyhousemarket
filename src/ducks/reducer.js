const initialState = {
    firstName: '',
    lastName: '',
    id: '',
    email: ''
}

const LOGIN_USER = "LOGIN_USER"

export default function reducer(state=initialState, action){
    switch(action.type){
        case LOGIN_USER:
            const {firstName, lastName, id, email} = action.payload
            return Object.assign({},state,{firstName,lastName,id,email})
        default: return state
    }
}

export function loginUser(firstName,lastName,id,email){
    return {
        type: LOGIN_USER,
        payload: {firstName,lastName,id,email}
    }
}