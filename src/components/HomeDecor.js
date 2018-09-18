import React, {Component} from 'react'
import axios from 'axios'
import MappedProducts from './MappedProducts'
import {Link,Redirect} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Parallax, Background } from 'react-parallax'
import Footer from './Footer'

library.add(faChevronLeft)

class HomeDecor extends Component{
    constructor(){
        super()
        this.state = {
            kidsProducts: []
        }
    }
    componentDidMount(){
        window.scrollTo(0,0)
        axios.get(`/api/products/3`)
        .then(res =>{
            this.setState({
                kidsProducts: res.data
            })
        })
    }



    render(){
        return(
            <div className="product-page">
            <div id="grad1" className="product-headline">
            <Parallax
                    strength={500}
                    bgImage={require('../images/HomeDecorMain.jpg')}
                    bgWidth='100%'
                    bgHeight='auto'
                    blur={1}
                    bgStyle = {{backgroundColor: 'black', opacity: '.7'}}
                     >
                <Link className="chevron-back"  to="/">
                    <FontAwesomeIcon onClick={()=>this.setState({toHome:true})} className="grow" icon="chevron-left" size="2x" color="white"/>
                </Link>
                <h2 className="product-headline-text">Kids Decals</h2>
                </Parallax>
                </div>
                <div className="product-grid">
                    {this.state.kidsProducts.map((element,i) =>{
                        return(
                            <Link className="main-product-div" to={`/product/${element.product_id}`} key={i}><div className="product"><MappedProducts productInfo={element}/></div></Link>
                        )
                    })}
                    {this.state.toHome ? <Redirect to="/"/> : ''}
                </div>
                {this.state.kidsProducts[0] ? <Footer /> : ''}
            </div>
        )
    }
}
export default HomeDecor