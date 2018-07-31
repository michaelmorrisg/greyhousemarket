import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import MappedProducts from './MappedProducts'

class Walls extends Component{
    constructor(){
        super()
        this.state = {
            wallsProducts: []
        }
    }
    componentDidMount(){
        axios.get(`/api/products/5`)
        .then(res=>{
            this.setState({
                wallsProducts: res.data
            })
        })
    }

    render(){
        return(
            <div>{this.state.wallsProducts.map((element,i)=>{
                return(
                    <Link to={`/product/${element.product_id}`} key={i}><div><MappedProducts productInfo = {element} /></div></Link>
                )
            })}</div>
        )
    }
}
export default Walls