import React, {Component} from 'react'
import {Switch,Route} from 'react-router-dom'
import MyOrders from './MyOrders'
import AccountNav from './AccountNav'

class MyAccount extends Component{

    render(){
        return(
            <div className="account-home">
                <AccountNav />
                <div>
                <Switch>
                    <Route path="/account/myaccount/myorders" component={MyOrders}/>
                </Switch>
                </div>
            </div>
        )
    }
}
export default MyAccount