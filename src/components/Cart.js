import React, {Component} from 'react'
import axios from 'axios'
import CartItem from './CartItem'
import CartTotals from './CartTotals'
import {connect} from 'react-redux'
import {countCart,subTotal} from '../ducks/reducer'


class Cart extends Component {
    constructor(){
        super()
        this.state = {
            cartItems: [],
        }
    this.removeFromCart = this.removeFromCart.bind(this)
    this.updateQuantity = this.updateQuantity.bind(this)
    }
    componentDidMount(){
        axios.get(`/api/getcart`)
        .then(response=>{
            console.log(response.data)
            this.setState({cartItems: response.data})
            //pulling prices and converting to do a subtotal
            var prices = response.data.map(arrayItem=>arrayItem.price)
            var quantities = response.data.map(arrayItem=>arrayItem.quantity)
            for (let i =0; i<prices.length; i++){prices[i] = +prices[i]}
            console.log(prices,quantities)
            var multiplied = 0
            for(let i=0; i< prices.length; i++){
                multiplied += prices[i] * quantities[i]
            }
            console.log(multiplied.toFixed(2))
            this.props.subTotal(multiplied.toFixed(2))
            })
    }
    removeFromCart(id,props){
        axios.delete(`/api/removefromcart/${id}`)
        .then(response=>{
            axios.get(`/api/getcart`)
                .then(res=>{
                    this.setState({cartItems: res.data})
                    var prices = res.data.map(arrayItem=>arrayItem.price)
                    var quantities = res.data.map(arrayItem=>arrayItem.quantity)
                    for (let i =0; i<prices.length; i++){prices[i] = +prices[i]}
                    console.log(prices,quantities)
                    var multiplied = 0
                    for(let i=0; i< prices.length; i++){
                        multiplied += prices[i] * quantities[i]
            }
                    this.props.subTotal(multiplied.toFixed(2))
            console.log(multiplied.toFixed(2))
            this.props.subTotal(multiplied.toFixed(2))
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
                    var prices = res.data.map(arrayItem=>arrayItem.price)
                    var quantities = res.data.map(arrayItem=>arrayItem.quantity)
                    for (let i =0; i<prices.length; i++){prices[i] = +prices[i]}
                    console.log(prices,quantities)
                    var multiplied = 0
                    for(let i=0; i< prices.length; i++){
                        multiplied += prices[i] * quantities[i]
            }
                    this.props.subTotal(multiplied.toFixed(2))
            console.log(multiplied.toFixed(2))
            this.props.subTotal(multiplied.toFixed(2))
                    axios.get('/api/totalcart')
                    .then(res=>{
                        this.props.countCart(res.data[0].sum)
                    })
                })
                
        })
    }

    render(){
        return(
            <div>
                {this.state.cartItems[0] ? this.state.cartItems.map((element,i)=>{
                    return (
                        <div>
                            <div>
                                <CartItem updateQuantity={this.updateQuantity} removeFromCart={this.removeFromCart} key={i} item={this.state.cartItems[i]}/>
                            </div>
                        </div>
                    )
                }) : ''}
                {this.state.cartItems[0] ? <CartTotals /> : ''}
                {!this.state.cartItems[0] ? "Your Cart is Currently Empty!": ''}
            </div>
        )
    }
}
export default connect(null, {countCart,subTotal})(Cart)