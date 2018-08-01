import React, {Component} from 'react'
import axios from 'axios'
import CartItem from './CartItem'
import {connect} from 'react-redux'
import {countCart} from '../ducks/reducer'

class Cart extends Component {
    constructor(){
        super()
        this.state = {
            cartItems: []
        }
    this.removeFromCart = this.removeFromCart.bind(this)
    this.updateQuantity = this.updateQuantity.bind(this)
    }
    componentDidMount(){
        axios.get(`/api/getcart`)
        .then(response=>{
            this.setState({cartItems: response.data})
        })
    }
    removeFromCart(id,props){
        axios.delete(`/api/removefromcart/${id}`)
        .then(response=>{
            axios.get(`/api/getcart`)
                .then(res=>{
                    this.setState({cartItems: res.data})
                })
                axios.get('/api/totalcart')
                    .then(res=>{
                        if(res.data[0].sum){
                        this.props.countCart(res.data[0].sum)
                        } else (
                            this.props.countCart(0)
                        )
                    })
        })
    }
    updateQuantity(id,quantity){
        axios.put(`/api/updatequantity/${id}/${quantity}`)
        .then(response=>{
            axios.get('/api/getcart')
                .then(res=>{
                    this.setState({cartItems: res.data})
                    axios.get('/api/totalcart')
                    .then(res=>{
                        this.props.countCart(res.data[0].sum)
                    })
                })
                
        })
    }

    render(){
        console.log(this.state.cartItems)
        return(
            <div>
                {this.state.cartItems[0] ? this.state.cartItems.map((element,i)=>{
                    return (
                            <CartItem updateQuantity={this.updateQuantity} removeFromCart={this.removeFromCart} key={i} item={this.state.cartItems[i]}/>
                    )
                }) : ''}
            </div>
        )
    }
}
export default connect(null, {countCart})(Cart)