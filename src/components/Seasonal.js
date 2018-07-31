import React, {Component} from 'react'
import axios from 'axios'
import MappedProducts from './MappedProducts'
import {Link} from 'react-router-dom'

class Seasonal extends Component{
    constructor(){
        super()
        this.state = {
            seasonProducts: []
        }
    }
    componentDidMount(){
        axios.get(`/api/products/1`)
        .then(res =>{
            this.setState({
                seasonProducts: res.data
            })
        })
    }


    render(){
        return(
            <div>
                {this.state.seasonProducts.map((element,i) =>{
                    return(
                        <Link to={`/product/${element.product_id}`} key={i}><div><MappedProducts productInfo={element}/></div></Link>
                    )
                })}
            </div>
        )
    }
}
export default Seasonal