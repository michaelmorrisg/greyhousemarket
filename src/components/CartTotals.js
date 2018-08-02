import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class CartTotals extends Component {
    constructor(){
        super()
    }


    render(props){
        return(
            <div>
                <h2>SubTotal</h2>
                <p>{this.props.subTotal}</p>
                <Link to="/checkout"><button>Proceed to Checkout</button></Link>
            </div>
        )
    }
}
function mapStateToProps(state){
const {subTotal} = state
return {subTotal}
}
export default connect(mapStateToProps)(CartTotals)

