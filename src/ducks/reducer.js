const initialState = {
    firstName: '',
    lastName: '',
    id: '',
    email: '',
    cart: 0
}

const LOGIN_USER = "LOGIN_USER"
const COUNT_CART = "COUNT_CART"


export default function reducer(state=initialState, action){
    switch(action.type){
        case LOGIN_USER:
            const {firstName, lastName, id, email} = action.payload
            return Object.assign({},state,{firstName,lastName,id,email})
    
        case COUNT_CART:
            const{cart} = action.payload
            return Object.assign({}, state, {cart}) 
        default: return state
    }
}

export function loginUser(firstName,lastName,id,email){
    return {
        type: LOGIN_USER,
        payload: {firstName,lastName,id,email}
    }
}
export function countCart(cart){
    return {
        type: COUNT_CART,
        payload: {cart}
    }
}
