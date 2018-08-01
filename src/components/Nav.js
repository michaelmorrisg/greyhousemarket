import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginUser, countCart} from '../ducks/reducer'

class Nav extends Component{
    constructor(){
        super()
        this.state = {
            firstName: '',
            lastName: '',
            id: 0,
            email: '',
            cartCount: 0
        }
    }

    componentDidMount(props){
        axios.get('/api/refreshuser')
        .then(res=>{
            console.log(res,'res')
            this.setState({
                firstName: res.data[0].first_name,
                lastName: res.data[0].last_name,
                id: res.data[0].id,
                email: res.data[0].email
            })
            const {firstName,lastName,id,email} = this.state
            this.props.loginUser(firstName,lastName,id,email)
        })
        axios.get('/api/totalcart')
            .then(res=>{
                console.log(res)
                this.setState({
                    cartCount: res.data[0].sum
                })
                this.props.countCart(this.state.cartCount)
            })
    }

    render(props){
        return(
            <div>
                <Link to="/">Home</Link>
                Nav Bar!
                <Link to="/account/login">Login</Link>
                <Link to="/cart">Cart({this.props.cart})</Link>
                <p>{this.props.firstName}</p>
            </div>
        )
    }
}
function mapStateToProps(state){
const {firstName, cart} = state
return {firstName, cart}
}
export default connect(mapStateToProps,{loginUser, countCart})(Nav)