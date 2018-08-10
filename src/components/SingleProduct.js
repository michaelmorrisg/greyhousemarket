import React, {Component} from 'react'
import axios from 'axios'
import Modal from './Modal'
import {connect} from 'react-redux'
import {countCart} from '../ducks/reducer'
import {Carousel} from 'react-responsive-carousel'
import {SplitButton,MenuItem} from 'react-bootstrap'
import Reviews from './Reviews'


class SingleProduct extends Component{
    constructor(){
        super()
        this.state = {
            productInfo: [],
            quantity: 1,
            showModal: false,
            images: [],
            color: '',
            colorOptions: [],
            toggleColor: false
        }

    this.toggleModalOff = this.toggleModalOff.bind(this)
    }
    componentDidMount(){
        axios.get(`/api/getproduct/${this.props.match.params.id}`)
        .then(res=>{
            console.log(res.data)
            let splitImages = res.data[0].image.split(' ')
            this.setState({
                productInfo: res.data,
                images: splitImages
            })
            let colors = this.state.productInfo[0].color_options.split(', ')
            this.setState({
                colorOptions: colors
            })
            console.log(this.state.colorOptions, 'color options')
        })
    }
    handleQuantity(input){
        this.setState({
            quantity: input
        })
    }
    addToCart(props){
        this.state.color !== '' ? 
        axios.post('/api/addproduct',
            {productId:this.state.productInfo[0].products_id, quantity:this.state.quantity, color:this.state.color
        })
        .then(res=>{
            if(res.data==="Gotta log in!"){
                this.toggleModalOn()
            } else {
                alert("Added to cart")
                this.setState({
                    toggleColor: false
                })
            }
        axios.get('/api/totalcart')
        .then(res=>{
            if(res.data[0].sum){
            this.props.countCart(res.data[0].sum)
        }else{
            this.props.countCart(0)
        }})
        }) : this.setState({
            toggleColor: true
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
    chooseColor(input){
        this.setState({
            color: input
        })
        console.log(this.state.color)
    }


    render(){
        return(
            <div className="single-product-main">
                <div className="carousel-div">{this.state.productInfo[0] ? <Carousel showStatus={false} className="carousel-image">{this.state.images.map((element,i)=>{
                    return(
                        <div className="carousel-image-div">
                            <img className="carousel-image-image" src={element}/>
                        </div>
                    )
                })}</Carousel> : ''}</div>
                <div>
                    {this.state.toggleColor? <p className="select-color">* Please select a color *</p> : ''}
                <SplitButton
                title={this.state.color? this.state.color : 'Color'}>
                    {this.state.colorOptions.map((element,i)=>{
                        return(
                            <MenuItem onClick={()=>this.chooseColor(element)} eventKey={i}>{element}</MenuItem>
                        )
                    })}
                </SplitButton>
                    <p>{this.state.productInfo[0] ? this.state.productInfo[0].product_name : ''}</p>
                    <p>{this.state.productInfo[0] ? '$'+this.state.productInfo[0].price : ''}</p>
                    <p>Quantity: <input onChange={(e)=>this.handleQuantity(e.target.value)} type="number" min="1" placeholder="1"/></p>
                    {this.state.productInfo[0] ? <button onClick={()=>this.addToCart()}>Add to Cart</button> : '' }
                    <p>{this.state.productInfo[0] ? this.state.productInfo[0].description : ''}</p>
                    <Modal class={this.state.showModal} toggle={this.toggleModalOff}/>
                </div>
                <Reviews productInfo={this.state.productInfo}/>
            </div>
        )

    }
}
export default connect(null,{countCart})(SingleProduct)