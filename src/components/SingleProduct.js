import React, {Component} from 'react'
import axios from 'axios'
import Modal from './Modal'
import {connect} from 'react-redux'
import {countCart} from '../ducks/reducer'
import {Carousel} from 'react-responsive-carousel'
import {SplitButton,MenuItem,DropdownButton,ButtonProps} from 'react-bootstrap'
import Reviews from './Reviews'
import Backdrop from './Backdrop';
import Swal from 'sweetalert2'
import Footer from './Footer'


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
            toggleColor: false,
            possibleQuantity: 10,
            showBackdrop: false
        }

    this.toggleModalOff = this.toggleModalOff.bind(this)
    }
    componentDidMount(){
        window.scrollTo(0,0)
        axios.get(`/api/getproduct/${this.props.match.params.id}`)
        .then(res=>{
            let splitImages = res.data[0].image.split(' ')
            this.setState({
                productInfo: res.data,
                images: splitImages
            })
        })
        axios.get(`/api/getcolors/${this.props.match.params.id}`)
        .then(res=>{
            this.setState({
                colorOptions: res.data
            })
        })
    }
    handleQuantity(input){
        if(input >= 1){
            this.setState({
                quantity: input
            })
        } else if (input <= 0){
            this.setState({
                quantity: 1
            })
        }
    }
    addToCart(props){
        this.state.color !== '' && this.state.quantity <= this.state.possibleQuantity ? 
        axios.post('/api/addproduct',
            {productId:this.state.productInfo[0].products_id, quantity:this.state.quantity, color:this.state.color
        })
        .then(res=>{
            if(res.data==="Gotta log in!"){
                this.toggleModalOn()
            } else {
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
        }) : this.state.color === '' ? this.setState({
            toggleColor: true
        }) : this.state.quantity > this.state.possibleQuantity ? Swal({type:'error', title:'Oops', text: `We only have ${this.state.possibleQuantity} left in that color`})
        : ''
    }

    toggleModalOn(){
        this.setState({
            showModal: true,
            showBackdrop: true
        })
    }
    toggleModalOff(){
        this.setState({
            showModal: false
        })
    }
    async chooseColor(color,quantity){
        if (quantity <= 0){
            return
        } else {
            await this.setState({
                color: color
            })
            let maxQuantity = this.state.colorOptions.findIndex(function(element){
                return element.color_name === color

            })
            let maxQuant = this.state.colorOptions[maxQuantity].product_quantity
            this.setState({
                possibleQuantity: maxQuant
            })
        }
    }
    backdropClickHandler = ()=>{
        this.setState({
          showModal: false,
          showBackdrop: false
        })
      }


    render(){
        return(
            <div className="single-product-main">
                <div className="carousel-div">{this.state.productInfo[0] ? <Carousel showArrows={true} showStatus={false} showThumbs={false} className="carousel-image">{this.state.images.map((element,i)=>{
                    if(element !== " " || element !== ""){
                    let image = {
                                height: '100%',
                                width: '100%',
                                backgroundImage : `url(${element})`,
                                backgroundSize : 'contain',
                                backgroundRepeat : 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundColor: '#E8E8E8'
                    }
                    return(
                        <div className="carousel-image-div">
                            {/* <img className="carousel-image-image" src={element}/> */}
                            <div className="single-products-image" style={image}></div>
                        </div>
                    )
                }
                })}</Carousel> : ''}</div>
                <div className="single-product-body-text">
                    <h4 className="single-product-header">{this.state.productInfo[0] ? this.state.productInfo[0].product_name : ''}</h4>
                    <p className="price-quantity">{this.state.productInfo[0] ? '$'+this.state.productInfo[0].price : ''}</p>
                    {this.state.toggleColor? <p className="select-color">* Please select a color *</p> : ''}
               <div className='button-div'>
                <DropdownButton
                // bsClass="btn test"
                id="obey-me"
                bsStyle="info"
                block={true}
                // active={true}
                title={this.state.color? this.state.color : 'Color'}>
                    {this.state.colorOptions.map((element,i)=>{
                        return(
                            <MenuItem onClick={()=>this.chooseColor(element.color_name,element.product_quantity)} className={element.product_quantity<=0? "disabled" : ''} eventKey={i}>{element.product_quantity > 0 ? element.color_name : element.color_name + ' (sold out)'}</MenuItem>
                        )
                    })}
                </DropdownButton>
                </div>
                    <p className="price-quantity">Quantity: <input className="quant-input" onChange={(e)=>this.handleQuantity(e.target.value)} type="number" min="1" max={this.state.possibleQuantity} placeholder="1"/></p>
                    {this.state.productInfo[0] ? <button className="addtocart-button" onClick={()=>this.addToCart()}>Add to Cart</button> : '' }
                    <h4 className="single-product-header">{this.state.productInfo[0] ? "Description" : ''}</h4>
                    <p className="description">{this.state.productInfo[0] ? this.state.productInfo[0].description : ''}</p>
                    <h4 className="single-product-header">Measurements</h4>
                    <p className="description">{this.state.productInfo[0] ? this.state.productInfo[0].measurements : ''}</p>
                    <Modal click={this.backdropClickHandler} class={this.state.showModal} toggle={this.toggleModalOff}/>
                    {this.state.showBackdrop ? <Backdrop click={this.backdropClickHandler}/> : ''}
                </div>
                <Reviews productInfo={this.state.productInfo}/>
                <Footer />
            </div>
        )

    }
}
export default connect(null,{countCart})(SingleProduct)