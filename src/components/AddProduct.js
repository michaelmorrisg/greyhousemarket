import React, {Component} from 'react'
import {SplitButton,MenuItem} from 'react-bootstrap'
import axios from 'axios'

class AddProduct extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            price: 0,
            image: '',
            description: '',
            colors: '',
            cat1: '',
            cat2: '',
            cat3: ''

        }
    }
    handleName(input){
        this.setState({
            name: input
        })
    }
    handlePrice(input){
        this.setState({
            price: input
        })
    }
    handleImage(input){
        this.setState({
            image: input
        })
    }
    handleDescription(input){
        this.setState({
            description: input
        })
    }
    handleColors(input){
        this.setState({
            colors: input
        })
    }
    handleCat1(input){
        this.setState({
            cat1: input
        })
    }
    handleCat2(input){
        this.setState({
            cat2: input
        })
    }
    handleCat3(input){
        this.setState({
            cat3: input
        })
    }
    addProduct(){
        axios.post('/api/addtodb',{
            name: this.state.name,
            price: this.state.price,
            image: this.state.image,
            description: this.state.description,
            colors: this.state.colors
        })
        .then(res=>{
            console.log(res.data[0].products_id)
            /////NEED TO ADD CATEGORIES TO DB
            let array = [this.state.cat1,this.state.cat2,this.state.cat3]
            array.map(element=>{
                if(element !== ''){
                    axios.post('/api/addcategory', {productId: res.data[0].products_id, category: element})
                    .then(res=>alert('added!'))
                }
            })
        })
    }


    render(){
        return(
            <div className="add-product">
                <input onChange={(e)=>this.handleName(e.target.value)} placeholder="Product Name - text"/>
                <input onChange={(e)=>this.handlePrice(e.target.value)} placeholder="Price - number"/>
                <input onChange={(e)=>this.handleImage(e.target.value)} placeholder="Images - single space between image values"/>
                <input onChange={(e)=>this.handleDescription(e.target.value)} placeholder="Description - text"/>
                <input onChange={(e)=>this.handleColors(e.target.value)} placeholder="Colors - separated by a comma and space"/>
                <h2>Categories (Seasonal, Nails, Kids, car, walls)</h2>
                <input onChange={(e)=>this.handleCat1(e.target.value)} placeholder="Category" />
                <input onChange={(e)=>this.handleCat2(e.target.value)} placeholder="Category" />
                <input onChange={(e)=>this.handleCat3(e.target.value)} placeholder="Category" />
                <button onClick={()=>this.addProduct()}>Add Product</button>

            </div>
        )
    }
}
export default AddProduct