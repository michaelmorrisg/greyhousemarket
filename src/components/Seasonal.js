import React, {Component} from 'react'
import axios from 'axios'
import MappedProducts from './MappedProducts'
import {Link} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Parallax, Background } from 'react-parallax'
import Footer from './Footer'

library.add(faChevronLeft)

class Seasonal extends Component{
    constructor(){
        super()
        this.state = {
            seasonProducts: []
        }
    }
    componentDidMount(){
        window.scrollTo(0,0)
        axios.get(`/api/products/1`)
        .then(res =>{
            this.setState({
                seasonProducts: res.data
            })
        })
    }


    render(){
        return(
            <div className="product-page">
            <div className="product-headline">
            <Parallax
                    strength={500}
                    bgStyle = {{backgroundColor: 'black', opacity: '.5'}}
                    bgImage={require('../images/seasonal-parallax.jpg')}
                    bgWidth='100%'
                    bgHeight='auto'
                    blur={1}
                     >
                <Link className="chevron-back" to="/">
                    <FontAwesomeIcon onClick={()=>this.setState({toHome:true})} className="grow" icon="chevron-left" size="2x" color="white"/>
                </Link>
                <h2 className="product-headline-text">Seasonal Decals</h2>
                </Parallax>
                </div>
            <div className="product-grid">
                {this.state.seasonProducts.map((element,i) =>{
                    return(
                        <Link className="main-product-div" to={`/product/${element.product_id}`} key={i}><div className="product"><MappedProducts productInfo={element}/></div></Link>
                    )
                })}
            </div>
            {this.state.seasonProducts[0] ? <Footer /> :''}
            </div>
        )
    }
}
export default Seasonal