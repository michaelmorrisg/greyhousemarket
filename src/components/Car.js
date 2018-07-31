import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import MappedProducts from './MappedProducts'

class Car extends Component{
    constructor(){
        super()
        this.state = {
            carProducts: []
        }
    }
    componentDidMount(){
        axios.get(`/api/products/4`)
        .then(res=>{
            this.setState({
                carProducts: res.data
            })
        })
    }


    render(){
        return(
            <div>{this.state.carProducts.map((element,i)=>{
                return(
                    <Link to={`/product/${element.product_id}`} key={i}><div><MappedProducts productInfo = {element} /></div></Link>
                )
            })}</div>
        )
    }
}
export default Car