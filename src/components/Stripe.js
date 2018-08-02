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
            toCart : false
        }
    }

    onToken= (token,props) => {
        token.card = void 0;
        console.log('token', token)
        axios.post('http://localhost:3020/api/payment', {token, amount: this.props.total*100}).then(response=>{
            // alert('it is working!')
            axios.delete('/api/clearcart')
                .then(response=>{
                    this.setState({
                        toCart: true
                })
                this.props.countCart(0)
                })
            })
        }
    render(props){
        return(
            <div>
                <StripeCheckout
                    token={this.onToken}
                    stripeKey= {process.env.REACT_APP_STRIPE_KEY}
                    amount={this.props.total*100}
                />
                {this.state.toCart === true ? <Redirect to="/cart"/>  : ''}
            </div>
        )
    }
}
function mapStateToProps(state){
    const {total} = state
    return {total} 
}
export default connect(mapStateToProps, {countCart})(Stripe)