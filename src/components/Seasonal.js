import React, {Component} from 'react'
import axios from 'axios'
import MappedProducts from './MappedProducts'

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
                {this.state.seasonProducts.map(element =>{
                    console.log(element)
                    return(
                        <a href={`/products/${element.product_id}`}><div><MappedProducts key={element} productInfo={element}/></div></a>
                    )
                })}
            </div>
        )
    }
}
export default Seasonal