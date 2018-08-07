import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {loginUser, countCart} from '../ducks/reducer'

class AccountNav extends Component{
    constructor(){
        super()
        this.state = {
            firstName: '',
            lastName: '',
            id: '',
            email: '',
            cartCount: 0,
        }
    }

    logOut(){
        axios.post('/api/logout')
            .then(res=>{
                axios.get('/api/refreshuser')
                    .then(res=>{
                        this.setState({
                            firstName: res.data[0].first_name,
                            lastName: res.data[0].last_name,
                            id: res.data[0].id,
                            email: res.data[0].email
                        })
                        const {firstName,lastName,id,email} = this.state
                        this.props.loginUser(firstName,lastName,id,email)
                    })
                        this.props.countCart(this.state.cartCount)
            })
    }

    render(){
        return (
            <div>
                <Link to="/account/myaccount/myorders" >My Orders</Link>
                <Link onClick={()=>this.logOut()} to="/">Log Out</Link>
            </div>
        )
    }
}
export default connect(null,{loginUser, countCart})(AccountNav)
