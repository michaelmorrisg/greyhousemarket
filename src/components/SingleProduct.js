import React, {Component} from 'react'
import axios from 'axios'
import Modal from './Modal'
import {connect} from 'react-redux'
import {countCart} from '../ducks/reducer'

class SingleProduct extends Component{
    constructor(){
        super()
        this.state = {
            productInfo: [],
            quantity: 1,
            showModal: false,
        }

    this.toggleModalOff = this.toggleModalOff.bind(this)
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
    addToCart(props){
        axios.post('/api/addproduct',
            {productId:this.state.productInfo[0].products_id,quantity:this.state.quantity
        })
        .then(res=>{
            if(res.data==="Gotta log in!"){
                this.toggleModalOn()
            } else {
                alert("Added to cart")
            }
        axios.get('/api/totalcart')
        .then(res=>{
            if(res.data[0].sum){
            this.props.countCart(res.data[0].sum)
        }else{
            this.props.countCart(0)
        }})
        })
    }

    toggleModalOn(){
        this.setState({
            showModal: true
        })
    }
    toggleModalOff(){
        this.setState({
            showModal: false
        })
    }


    render(){
        return(
            <div>
                <div>{this.state.productInfo[0] ? this.state.productInfo[0].image : ''}</div>
                <div>
                    <p>{this.state.productInfo[0] ? this.state.productInfo[0].product_name : ''}</p>
                    <p>{this.state.productInfo[0] ? this.state.productInfo[0].price : ''}</p>
                    <p>Quantity: <input onChange={(e)=>this.handleQuantity(e.target.value)} type="number" min="1" placeholder="1"/></p>
                    {this.state.productInfo[0] ? <button onClick={()=>this.addToCart()}>Add to Cart</button> : '' }
                    <p>{this.state.productInfo[0] ? this.state.productInfo[0].description : ''}</p>
                    <Modal class={this.state.showModal} toggle={this.toggleModalOff}/>
                </div>
            </div>
        )

    }
}
export default connect(null,{countCart})(SingleProduct)