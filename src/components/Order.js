import React, {Component} from 'react'
import Stripe from './Stripe'
import {connect} from 'react-redux'
import {getTotal} from '../ducks/reducer'
import axios from 'axios'

class Order extends Component {
    constructor(){
        super()
        this.state = {
            cart: [],
            total: 0
        }
    }
    componentDidMount(props){
        axios.get('/api/getcart')
        .then(res =>{
            this.setState({
                cart: res.data,
                total: (Number(this.props.subTotal) + 4).toFixed(2)
            })
            this.props.getTotal(this.state.total)
            
            console.log(res.data)
        })
    }


    render(props){
        return(
            <div>
                <h2>Order</h2>
                {this.state.cart.map(element=>{
                    return(
                        <div>
                            <h5>{element.product_name}</h5>
                            <p>x{element.quantity}</p>
                            <p>${Number(element.price)*element.quantity}</p>
                        </div>
                    )
                })}
                <p>Subtotal ${Number(this.props.subTotal).toFixed(2)}</p>
                <p>Shipping $4.00</p>
                <p>Total ${this.state.total}</p>
                <Stripe />
            </div>
        )
    }
}
function mapStateToProps(state){
 const {subTotal} = state
 return {subTotal}
}
export default connect(mapStateToProps,{getTotal})(Order)