import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import MappedProducts from './MappedProducts'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Parallax, Background } from 'react-parallax'
import Footer from './Footer'

library.add(faChevronLeft)

class Car extends Component{
    constructor(){
        super()
        this.state = {
            carProducts: []
        }
    }
    componentDidMount(){
        window.scrollTo(0,0)
        axios.get(`/api/products/4`)
        .then(res=>{
            this.setState({
                carProducts: res.data
            })
        })
    }


    render(){
        return(
            <div className="product-page">
            <div className="product-headline">
            <Parallax
                    strength={500}
                    bgImage={require('../images/car-parallax.jpg')}
                    bgWidth='100%'
                    bgHeight='auto'
                    blur={1}
                    bgStyle = {{backgroundColor: 'black', opacity: '.6'}}
                     >
                <Link className="chevron-back"  to="/">
                    <FontAwesomeIcon onClick={()=>this.setState({toHome:true})} icon="chevron-left" size="2x" color="white"/>
                </Link>
                <h2 className="product-headline-text">Car Decals</h2>
                </Parallax>
                </div>
            <div className="product-grid">{this.state.carProducts.map((element,i)=>{
                return(
                    <Link className="main-product-div" to={`/product/${element.product_id}`} key={i}><div className="product"><MappedProducts productInfo = {element} /></div></Link>
                )
            })}</div>
            <Footer />
            </div>
        )
    }
}
export default Car