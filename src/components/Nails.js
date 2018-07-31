import React, {Component} from 'react'
import axios from 'axios'
import MappedProducts from './MappedProducts'

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
            <div>{this.state.nailsProducts.map(element=>{
                return(
                    <div><MappedProducts key={element} productInfo = {element} /></div>
                )
            })}</div>
        )
    }
}
export default Nails