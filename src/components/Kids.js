import React, {Component} from 'react'
import axios from 'axios'
import MappedProducts from './MappedProducts'
import {Link} from 'react-router-dom'

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
            <div>
                {this.state.kidsProducts.map((element,i) =>{
                    return(
                        <Link to={`/product/${element.product_id}`} key={i}><div><MappedProducts productInfo={element}/></div></Link>
                    )
                })}
            </div>
        )
    }
}
export default Kids