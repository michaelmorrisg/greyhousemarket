import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Kids from './components/Kids'
import Nails from './components/Nails'
import Walls from './components/Walls'
import Car from './components/Car'
import Seasonal from './components/Seasonal'
import SingleProduct from './components/SingleProduct'
import Cart from './components/Cart'

export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/account/login" component={Login} />
        <Route path="/account/register" component={Register} />
        <Route path="/nails" component={Nails}/>
        <Route path="/kids" component={Kids}/>
        <Route path="/walls" component={Walls}/>
        <Route path="/car" component={Car}/>
        <Route path="/seasonal" component={Seasonal}/>
        <Route path="/product/:id" component={SingleProduct}/>
        <Route path="/cart" component={Cart}/>
    </Switch>
)