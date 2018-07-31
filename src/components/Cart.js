import React, {Component} from 'react'
import axios from 'axios'

class Cart extends Component {
    constructor(){
        super()
        this.state = {
            cartItems: []
        }
    }
    componentDidMount(){
        axios.get(`/api/getcart`)
        .then(response=>{
            this.setState({cartItems: response.data})
        })
    }

    render(){
        console.log(this.state.cartItems)
        return(
            <div>
                {this.state.cartItems[0] ? this.state.cartItems.map(element=>{
                    return (
                        <div>
                            <p>{element.product_name}</p>
                            <p>{element.price}</p>
                        </div>
                    )
                }) : ''}
            </div>
        )
    }
}
export default Cart