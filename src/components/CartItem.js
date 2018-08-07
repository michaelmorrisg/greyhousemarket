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
            <div>
{console.log(this.props.item)}
                <p><img className="cart-image" src={this.state.image}/></p>
                <p>{this.props.item.product_name} ({this.props.item.color})</p>
                <p><input onChange={(e)=>this.handleChange(e.target.value)} type="number" min="1" value={this.state.quantity}/></p>
                <p>{(this.props.item.price * this.state.quantity).toFixed(2)}</p>
                <button onClick={()=>this.props.removeFromCart(this.props.item.product_id,this.props.item.color)}>Remove from cart</button>
            </div>
        )
    }
}
export default connect(null, {countCart})(CartItem)
