import React, {Component} from 'react'
import {Switch,Route} from 'react-router-dom'
import MyOrders from './MyOrders'
import AccountNav from './AccountNav'
import UpdatePassword from './UpdatePassword'

class MyAccount extends Component{

    componentDidMount(){
        window.scrollTo(0,0)
    }

    render(){
        return(
            <div className="account-home">
                <AccountNav />
                <div>
                <Switch>
                    <Route path="/account/myaccount/myorders" component={MyOrders}/>
                    <Route path="/account/myaccount/updatepassword" component={UpdatePassword}/>
                </Switch>
                </div>
            </div>
        )
    }
}
export default MyAccount