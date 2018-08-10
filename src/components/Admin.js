import React, {Component} from 'react'
import {Switch, Route, Link} from 'react-router-dom'
import AddProduct from './AddProduct'
import Orders from './Orders'

class Admin extends Component{
    constructor(){
        super()
        this.state = {

        }
    }

    render(){
        return (
            <div>
                <Link to="/admin/addproduct">Add Product</Link>
                <Link to="/admin/orders">Pending Orders</Link>
                <Switch>
                    <Route path="/admin/addproduct" component={AddProduct}/>
                    <Route path="/admin/orders" component={Orders}/>
                </Switch>
            </div>
        )
    }
}
export default Admin