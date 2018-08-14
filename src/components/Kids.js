import React, {Component} from 'react'
import axios from 'axios'
import MappedProducts from './MappedProducts'
import {Link,Redirect} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronLeft)

class Kids extends Component{
    constructor(){
        super()
        this.state = {
            kidsProducts: []
        }
    }
    componentDidMount(){
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
            <div className="product-headline">
                <Link className="chevron-back"  to="/">
                    <FontAwesomeIcon onClick={()=>this.setState({toHome:true})} icon="chevron-left" size="2x" color="white"/>
                </Link>
                <h2 className="product-headline-text">Kids Decals</h2>
                </div>
                <div className="product-grid">
                    {this.state.kidsProducts.map((element,i) =>{
                        return(
                            <Link className="main-product-div" to={`/product/${element.product_id}`} key={i}><div className="product"><MappedProducts productInfo={element}/></div></Link>
                        )
                    })}
                    {this.state.toHome ? <Redirect to="/"/> : ''}
                </div>
            </div>
        )
    }
}
export default Kids