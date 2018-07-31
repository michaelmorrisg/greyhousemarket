import React, {Component} from 'react'
import axios from 'axios'

class SingleProduct extends Component{
    constructor(){
        super()
        this.state = {
            productInfo: [],
            quantity: 1
        }
    }
    componentDidMount(){
        axios.get(`/api/getproduct/${this.props.match.params.id}`)
        .then(res=>{
            this.setState({
                productInfo: res.data
            })
        })
    }
    handleQuantity(input){
        this.setState({
            quantity: input
        })
    }

    render(){
        console.log(this.state.productInfo[0])
        return(
            <div>
                <div>{this.state.productInfo[0] ? this.state.productInfo[0].image : ''}</div>
                <div>
                    <p>{this.state.productInfo[0] ? this.state.productInfo[0].product_name : ''}</p>
                    <p>{this.state.productInfo[0] ? this.state.productInfo[0].price : ''}</p>
                    <p>Quantity: <input onChange={(e)=>this.handleQuantity(e.target.value)} type="number" placeholder="1"/></p>
                    {this.state.productInfo[0] ? <button>Add to Cart</button> : '' }
                    <p>{this.state.productInfo[0] ? this.state.productInfo[0].description : ''}</p>
                </div>
            </div>
        )

    }
}
export default SingleProduct