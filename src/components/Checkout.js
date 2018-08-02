import React,{Component} from 'react'
import Order from './Order'

class Checkout extends Component {
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        return(
            <div className="checkout">
            <div>
                <h1>Checkout</h1>
                <h2>Shipping Address</h2>
                <input />
                <h3>Email Address</h3>
                <input />
                <h3>First Name</h3>
                <input />
                <h3>Last Name</h3>
                <input />
                <h3>Address</h3>
                <input />
                <h3>Address 2</h3>
                <input />
                <h3>Zip Code</h3>
                <input />
                <h3>City</h3>
                <input />
                <h3>State</h3>
                </div>
                <Order />
            </div>
        )
    }
}
export default Checkout