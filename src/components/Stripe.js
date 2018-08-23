import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import {connect} from 'react-redux'
import {countCart} from '../ducks/reducer'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

class Stripe extends Component {
    constructor(){
        super()
        this.state = {
            toCart : false,
            cart : [],
            loading: false
        }
    }

    onToken= (token,props) => {
        this.setState({loading: true})
        token.card = void 0;
        // console.log('token', token)
        axios.post('/api/payment', {token, amount: this.props.total*100}).then(response=>{
            axios.get('/api/getcart')
            .then(response=>{
                this.setState({
                    cart: response.data
                })
                let date = Date()
            axios.put('/api/updatemaxquantity', {cart:this.state.cart})
            axios.post('/api/addpurchase',{amount: this.props.total,date: date})
            .then(response=>{
                axios.post('/api/addpurchasecart',{cart:this.state.cart,purchaseId:response.data[0].purchase_id})
            })    
            axios.post('/api/sendtanninemail', {firstName:this.props.shipFirstName,lastName:this.props.shipLastName, email:this.props.shipEmail, address1: this.props.shipAddress1, address2: this.props.shipAddress2, zip: this.props.shipZipCode, city: this.props.shipCity, state: this.props.shipState, products: response.data})
            axios.post('/api/sendclientemail', {firstName:this.props.shipFirstName,lastName:this.props.shipLastName, email:this.props.shipEmail, products: response.data})
            if(this.props.firstName === "Guest"){
                axios.put('/api/updateguestemail', {email:this.props.shipEmail})
            }
            axios.delete('/api/clearcart')
                .then(response=>{
                    this.setState({
                        loading: false,
                        toCart: true
                })
                this.props.countCart(0)
                })
        })})
        }
    render(props){
        return(
            <div>
                <StripeCheckout
                    token={this.onToken}
                    stripeKey= {process.env.REACT_APP_STRIPE_KEY}
                    amount={this.props.total*100}
                    email={this.props.shipEmail}
                    name="Grey House Market"
                    data-shippingAddress={true}
                    image="https://i.etsystatic.com/isla/420b13/29519511/isla_500x500.29519511_ifsfvos4.jpg?version=0"
                />
                {this.state.toCart === true ? <Redirect to="/orders/confirmation"/>  : ''}
            </div>
        )
    }
}
function mapStateToProps(state){
    const {total,shipFirstName,shipLastName,shipEmail,shipCity,shipState,shipZipCode,shipAddress1,shipAddress2,firstName} = state
    return {total,shipFirstName,shipLastName,shipEmail,shipCity,shipState,shipZipCode,shipAddress1,shipAddress2,firstName} 
}
export default connect(mapStateToProps, {countCart})(Stripe)