import React, {Component} from 'react'
import {SplitButton,MenuItem} from 'react-bootstrap'
import axios from 'axios'
import {findIndex,indexOf} from 'lodash'

class AddProduct extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            price: 0,
            image: '',
            description: '',
            measurement: '',
            colors: [],
            categories: []
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
    handleMeasurement(input){
        this.setState({
            measurement: input
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
    handleColor(input){
        if(findIndex(this.state.colors, {"color":input}) === -1){
            let tempArray = this.state.colors
            tempArray.push({"color":input})
            this.setState({
                colors: tempArray
            })
        } else {
            let tempArray = this.state.colors
            let index = findIndex(tempArray, {"color":input})
            tempArray.splice(index,1)
        this.setState({
            colors: tempArray
        })
    }
    }
    handleQuantity(input,colorVal){
        let tempArray = this.state.colors
        if(findIndex(tempArray, {"color": colorVal}) !== -1){
            let index = findIndex(tempArray, {"color": colorVal})
            tempArray[index].quantity = input
            this.setState({
                colors: tempArray
            })
        }
    }
    handleCategory(input){
        let tempArray = this.state.categories
        if(indexOf(tempArray,input) === -1){
            tempArray.push(input)
            this.setState({
                categories: tempArray
            })
        } else {
            let index = indexOf(tempArray,input)
            tempArray.splice(index,1)
            this.setState({
                categories: tempArray
            })
        }

    }
    addProduct(){
        axios.post('/api/addtodb',{
            name: this.state.name,
            price: this.state.price,
            image: this.state.image,
            description: this.state.description,
            measurement: this.state.measurement,
            colors: this.state.colors
        })
        .then(res=>{
            /////NEED TO ADD CATEGORIES TO DB
            this.state.categories.map(element=>{
                    axios.post('/api/addcategory', {productId: res.data[0].products_id, category: element})
                    .then(res=>alert('added!'))
            })
        })
    }


    render(){
        return(
            <div className="add-product">
            <div className="general-product-div">
            <h2>General Product Information</h2>
                <input onChange={(e)=>this.handleName(e.target.value)} placeholder="Product Name - text"/>
                <input onChange={(e)=>this.handlePrice(e.target.value)} placeholder="Price - number"/>
                <textarea id="large-text" onChange={(e)=>this.handleImage(e.target.value)} placeholder="Images - single space between image urls"></textarea>
                <textarea id="large-text" onChange={(e)=>this.handleDescription(e.target.value)} placeholder="Description - text"></textarea>
                <input onChange={(e)=>this.handleMeasurement(e.target.value)} placeholder="Measurements - text"/>
            </div>
                
            <h3>Colors & Quantities</h3>
            <div className="main-color-div">
            <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="1"/>Light Pink
                <input onChange={(e)=>this.handleQuantity(e.target.value,"1")}placeholder="Qty"/>
            </div>
            <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="2"/>Dark Pink
                <input onChange={(e)=>this.handleQuantity(e.target.value,"2")}placeholder="Qty"/>
            </div>
            <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="3"/>Red
                <input onChange={(e)=>this.handleQuantity(e.target.value,"3")}placeholder="Qty"/>
                </div>
                <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="4"/>Yellow
                <input onChange={(e)=>this.handleQuantity(e.target.value,"4")}placeholder="Qty"/>
                </div>
                <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="5"/>Matte Yellow
                <input onChange={(e)=>this.handleQuantity(e.target.value,"5")}placeholder="Qty"/>
                </div>
                <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="6"/>Orange
                <input onChange={(e)=>this.handleQuantity(e.target.value,"6")}placeholder="Qty"/>
                </div>
                <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="7"/>Mint
                <input onChange={(e)=>this.handleQuantity(e.target.value,"7")}placeholder="Qty"/>
                </div>
                <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="8"/>Lime
                <input onChange={(e)=>this.handleQuantity(e.target.value,"8")}placeholder="Qty"/>
                </div>
                <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="9"/>Green
                <input onChange={(e)=>this.handleQuantity(e.target.value,"9")}placeholder="Qty"/>
                </div>
                <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="10"/>Matte Light Blue
                <input onChange={(e)=>this.handleQuantity(e.target.value,"10")}placeholder="Qty"/>
                </div>
                <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="11"/>Sky Blue
                <input onChange={(e)=>this.handleQuantity(e.target.value,"11")}placeholder="Qty"/>
                </div>
                <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="12"/>True Blue
                <input onChange={(e)=>this.handleQuantity(e.target.value,"12")}placeholder="Qty"/>
                </div>
                <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="13"/>Midnight Blue
                <input onChange={(e)=>this.handleQuantity(e.target.value,"13")}placeholder="Qty"/>
                </div>
                <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="14"/>Purple
                <input onChange={(e)=>this.handleQuantity(e.target.value,"14")}placeholder="Qty"/>
                </div>
                <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="15"/>Gray
                <input onChange={(e)=>this.handleQuantity(e.target.value,"15")}placeholder="Qty"/>
                </div>
                <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="16"/>Silver
                <input onChange={(e)=>this.handleQuantity(e.target.value,"16")}placeholder="Qty"/>
                </div>
                <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="17"/>Gold
                <input onChange={(e)=>this.handleQuantity(e.target.value,"17")}placeholder="Qty"/>
                </div>
                <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="18"/>Tan
                <input onChange={(e)=>this.handleQuantity(e.target.value,"18")}placeholder="Qty"/>
                </div>
                <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="19"/>Brown
                <input onChange={(e)=>this.handleQuantity(e.target.value,"19")}placeholder="Qty"/>
                </div>
                <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="20"/>White
                <input onChange={(e)=>this.handleQuantity(e.target.value,"20")}placeholder="Qty"/>
                </div>
                <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="21"/>Black
                <input onChange={(e)=>this.handleQuantity(e.target.value,"21")}placeholder="Qty"/>
                </div>
                <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="22"/>Matte White
                <input onChange={(e)=>this.handleQuantity(e.target.value,"22")}placeholder="Qty"/>
                </div>
                <div className="color-div">
                <input onClick={(e)=>this.handleColor(e.target.value)} type="checkbox" value="23"/>Matte Black
                <input onChange={(e)=>this.handleQuantity(e.target.value,"23")}placeholder="Qty"/>
                </div>
                </div>
                <h2>Categories</h2>
                <div className="category-div">
                <div className="category-individual">
                <input onClick={(e)=>this.handleCategory(e.target.value)} type="checkbox" value="Seasonal" />Seasonal
                </div>
                <div className="category-individual">
                <input onClick={(e)=>this.handleCategory(e.target.value)} type="checkbox" value="Nails" />Nails
                </div>
                <div className="category-individual">
                <input onClick={(e)=>this.handleCategory(e.target.value)} type="checkbox" value="Kids" />Kids
                </div>
                <div className="category-individual">
                <input onClick={(e)=>this.handleCategory(e.target.value)} type="checkbox" value="car" />Car
                </div>
                <div className="category-individual">
                <input onClick={(e)=>this.handleCategory(e.target.value)} type="checkbox" value="walls" />Home Decor
                </div>
                <button className="addtocart-button" onClick={()=>this.addProduct()}>Add Product</button>
                </div>

            </div>
        )
    }
}
export default AddProduct