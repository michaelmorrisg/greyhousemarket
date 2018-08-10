import React,{Component} from 'react'
import {connect} from 'react-redux'
import {countCart} from '../ducks/reducer'

class CartItem extends Component{
constructor(props){
    super()
    this.state = {
        quantity: props.item.quantity,
        image: ''
    }
}
componentDidMount(){
    let firstImg = this.props.item.image.split(" ")
    this.setState({
        image: firstImg[0]
    })
}
componentDidUpdate(prevProps){
   if (this.props.item.quantity !== prevProps.item.quantity){
       this.setState({quantity: this.props.item.quantity})
   }
}
handleChange(input){
    this.setState({
        quantity: input
    })
    this.props.updateQuantity(this.props.item.product_id,input,this.props.item.color)

}

    render(props){
        return(
            <div className="main-cart-item-div">
                <div className="left-cart-item">
                    <div>
                        <p>{this.props.item.product_name}</p>
                        <p>Color: {this.props.item.color}</p>
                        <p>Quantity: <input onChange={(e)=>this.handleChange(e.target.value)} type="number" min="1" value={this.state.quantity}/></p>
                    </div>
                    <div>
                        <p>${(this.props.item.price * this.state.quantity).toFixed(2)}</p>
                        <button onClick={()=>this.props.removeFromCart(this.props.item.product_id,this.props.item.color)}>Remove from cart</button>
                    </div>
                </div>
                <div className="right-cart-item">
                <p><img className="cart-image" src={this.state.image}/></p>
                </div>
            </div>
        )
    }
}
export default connect(null, {countCart})(CartItem)
