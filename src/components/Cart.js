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
        window.scrollTo(0,0)
        axios.get(`/api/getcart`)
        .then(response=>{

            this.setState({cartItems: response.data})
            //pulling prices and converting to do a subtotal
            var prices = response.data.map(arrayItem=>arrayItem.price)
            var quantities = response.data.map(arrayItem=>arrayItem.quantity)
            for (let i =0; i<prices.length; i++){prices[i] = +prices[i]}
            var multiplied = 0
            for(let i=0; i< prices.length; i++){
                multiplied += prices[i] * quantities[i]
            }
            this.props.subTotal(multiplied.toFixed(2))
            })
    }
    removeFromCart(id,color,props){
        axios.delete(`/api/removefromcart/${id}/${color}`)
        .then(response=>{
            axios.get(`/api/getcart`)
                .then(res=>{
                    this.setState({cartItems: res.data})
                    var prices = res.data.map(arrayItem=>arrayItem.price)
                    var quantities = res.data.map(arrayItem=>arrayItem.quantity)
                    for (let i =0; i<prices.length; i++){prices[i] = +prices[i]}
                    var multiplied = 0
                    for(let i=0; i< prices.length; i++){
                        multiplied += prices[i] * quantities[i]
            }
                    this.props.subTotal(multiplied.toFixed(2))
            this.props.subTotal(multiplied.toFixed(2))
                })
                axios.get('/api/totalcart')
                    .then(res=>{
                        if(res.data[0].sum){
                        this.props.countCart(res.data[0].sum)
                        } else (
                            this.props.countCart(0)
                        )
                        this.forceUpdate()
                    })
        })
    }
    updateQuantity(id,quantity,color){
        axios.put(`/api/updatequantity/${id}/${quantity}/${color}`)
        .then(response=>{
            axios.get('/api/getcart')
                .then(res=>{
                    this.setState({cartItems: res.data})
                    var prices = res.data.map(arrayItem=>arrayItem.price)
                    var quantities = res.data.map(arrayItem=>arrayItem.quantity)
                    for (let i =0; i<prices.length; i++){prices[i] = +prices[i]}
                    var multiplied = 0
                    for(let i=0; i< prices.length; i++){
                        multiplied += prices[i] * quantities[i]
            }
                    this.props.subTotal(multiplied.toFixed(2))
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
            <div className="main-cart">
                {this.state.cartItems[0] ? this.state.cartItems.map((element,i)=>{

                    return (
                                <CartItem updateQuantity={this.updateQuantity} key={i} removeFromCart={this.removeFromCart} item={this.state.cartItems[i]}/>
                    )
                }) : ''}
                {this.state.cartItems[0] ? <CartTotals /> : ''}
                {!this.state.cartItems[0] ? <h3 className="empty-cart">Your Cart is Currently Empty!</h3>: ''}
            </div>
        )
    }
}
export default connect(null, {countCart,subTotal})(Cart)