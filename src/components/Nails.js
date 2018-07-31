import React, {Component} from 'react'
import axios from 'axios'
import MappedProducts from './MappedProducts'
import {Link} from 'react-router-dom'

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
            <div>{this.state.nailsProducts.map((element,i)=>{
                return(
                    <Link to={`/product/${element.product_id}`} key={i}><div><MappedProducts productInfo = {element} /></div></Link>
                )
            })}</div>
        )
    }
}
export default Nails