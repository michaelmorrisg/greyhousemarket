import React, {Component} from 'react'
import axios from 'axios'
import MappedProducts from './MappedProducts'
import {Link} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronLeft)

class Nails extends Component{
    constructor(){
        super()
        this.state = {
            nailsProducts: []
        }
    }

    componentDidMount(){
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
                    <Link className="chevron-back" to="/">
                        <FontAwesomeIcon onClick={()=>this.setState({toHome:true})} icon="chevron-left" size="2x" color="black"/>
                    </Link>
                    <h2>Nail Decals</h2>
                </div>
                <div className="product-grid">{this.state.nailsProducts.map((element,i)=>{
                    return(
                        <Link className="main-product-div" to={`/product/${element.product_id}`} key={i}><div className="product"><MappedProducts productInfo = {element} /></div></Link>
                    )
                })}</div>
            </div>
        )
    }
}
export default Nails