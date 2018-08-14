import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'

class CartTotals extends Component {
    constructor(){
        super()
        this.state = {
            cartItems: []
        }
    }


    render(props){
        return(
            <div className={this.props.cart !== 0 ? "subtotal-showing" : "subtotal-hidden"}>
                <div>
                    {this.props.subTotal != 0.00 ? <p>Cart Total: ${this.props.subTotal}</p>: ''}
                    <Link className="checkout-text" to="/checkout"><button>Proceed to Checkout</button></Link>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
const {subTotal,cart,id} = state
return {subTotal,cart,id}
}
export default connect(mapStateToProps)(CartTotals)

