const initialState = {
    firstName: '',
    lastName: '',
    id: '',
    email: '',
    cart: 0,
    subTotal: 0,
    total: 0,
    shipAddress1: '',
    shipAddress2: '',
    shipZipCode: '',
    shipCity: '',
    shipState: '',
    shipFirstName: '',
    shipLastName: '',
    shipEmail: ''
}

const LOGIN_USER = "LOGIN_USER"
const COUNT_CART = "COUNT_CART"
const SUBTOTAL = "SUBTOTAL"
const TOTAL = "TOTAL"
const UPDATE_SHIPPING = "UPDATE_SHIPPING"



export default function reducer(state=initialState, action){
    switch(action.type){
        case LOGIN_USER:
            const {firstName, lastName, id, email} = action.payload
            return Object.assign({},state,{firstName,lastName,id,email})
    
        case COUNT_CART:
            const{cart} = action.payload
            return Object.assign({}, state, {cart}) 

        case SUBTOTAL:
            const{subTotal} = action.payload
            return Object.assign({},state,{subTotal})
        
        case TOTAL:
            const {total} = action.payload
            return Object.assign({},state,{total})

        case UPDATE_SHIPPING:
            const {shipEmail,shipFirstName,shipLastName,shipAddress1,shipAddress2,shipZipCode,shipCity,shipState} = action.payload
            return Object.assign({},state,{shipEmail,shipFirstName,shipLastName,shipAddress1,shipAddress2,shipZipCode,shipCity,shipState})
     
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
export function subTotal(subTotal){
    return {
        type: SUBTOTAL,
        payload: {subTotal}
    }
}
export function getTotal(total){
    return {
        type: TOTAL,
        payload: {total}
    }
}

export function updateShipping(shipEmail,shipFirstName,shipLastName,shipAddress1,shipAddress2,shipZipCode,shipCity,shipState){
    return {
        type: UPDATE_SHIPPING,
        payload: {shipEmail,shipFirstName,shipLastName,shipAddress1,shipAddress2,shipZipCode,shipCity,shipState}
    }
} 

