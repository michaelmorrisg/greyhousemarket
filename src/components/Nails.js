import React, {Component} from 'react'
import axios from 'axios'
import MappedProducts from './MappedProducts'
import {Link} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Parallax, Background } from 'react-parallax'
import Backdrop from './Backdrop'
import Footer from './Footer'

library.add(faChevronLeft)

class Nails extends Component{
    constructor(){
        super()
        this.state = {
            nailsProducts: []
        }
    }

    componentDidMount(){
        window.scrollTo(0,0)
        axios.get(`/api/products/2`)
        .then(res=>{
            this.setState({
                nailsProducts: res.data
            })
        })
    }


    render(){
        return(
            <div className="product-page">
                <div className="product-headline">
                <Parallax
                    strength={500}
                    bgImage={require('../images/Nails-Parallax.jpg')}
                    bgWidth='100%'
                    bgHeight='auto'
                    blur={1}
                    bgStyle = {{backgroundColor: 'black', opacity: '.7'}}
                    >
                    <Link className="chevron-back" to="/">
                        <FontAwesomeIcon onClick={()=>this.setState({toHome:true})} className="grow" icon="chevron-left" size="2x" color="white"/>
                    </Link>
                    <h2 className="product-headline-text">Nail Decals</h2>
                </Parallax>
                </div>
                <div className="product-grid">{this.state.nailsProducts.map((element,i)=>{
                    return(
                        <Link className="main-product-div" to={`/product/${element.product_id}`} key={i}><div className="product"><MappedProducts productInfo = {element} /></div></Link>
                    )
                })}</div>
                {this.state.nailsProducts[0]? <Footer /> : '' }
            </div>
        )
    }
}
export default Nails