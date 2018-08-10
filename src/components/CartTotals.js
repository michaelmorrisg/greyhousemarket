import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {subTotal} from '../ducks/reducer'

class CartTotals extends Component {

    render(props){
        return(
            <div className={this.props.cart !== 0 ? "subtotal-showing" : "subtotal-hidden"}>
                <div>
                    {this.props.subTotal != 0 ? <p>Cart Total: ${this.props.subTotal}</p>: ''}
                    <Link className="checkout-text" to="/checkout"><button>Proceed to Checkout</button></Link>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
const {subTotal,cart} = state
return {subTotal,cart}
}
export default connect(mapStateToProps)(CartTotals)

