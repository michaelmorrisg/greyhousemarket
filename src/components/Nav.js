import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginUser, countCart} from '../ducks/reducer'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faBars)
library.add(faShoppingCart)
library.add(faSearch)

class Nav extends Component{
    constructor(){
        super()
        this.state = {
            firstName: '',
            lastName: '',
            id: 0,
            email: '',
            cartCount: 0,
            admin: false,
            rotated: false,
            scroll: 0
        }
    }

    componentDidMount(props){
        axios.get('/api/refreshuser')
        .then(res=>{
            this.setState({
                firstName: res.data[0].first_name,
                lastName: res.data[0].last_name,
                id: res.data[0].id,
                email: res.data[0].email,
                admin: res.data[0].admin
            })
            const {firstName,lastName,id,email,admin} = this.state
            this.props.loginUser(firstName,lastName,id,email,admin)
            console.log(this.state.admin)
        })
        axios.get('/api/totalcart')
            .then(res=>{
                if(res.data[0].sum){
                this.setState({
                    cartCount: res.data[0].sum
                })} else{
                    this.setState({
                        cartCount: 0
                    })
                }
                this.props.countCart(this.state.cartCount)
            })
            window.addEventListener("scroll", e => {
                this.setState({
                  scroll:e.path[1].pageYOffset
                })
             });
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
                        this.props.loginUser(firstName,lastName,id,email)})
                        this.props.countCart(this.state.cartCount)
            })
    }

    render(props){
        return(
            <div>
                <div className={this.state.scroll > 30 ? "navbar-background scrolling-background" : 'navbar-background'}>
                    <div className={this.state.scroll > 30 ? 'navbar scrolling-navbar' : 'navbar'}>
                        <div className='navbar-left'>
                            <img src={require('../images/Hamburger.png')} onClick={()=>this.setState({rotated:!this.state.rotated})} className={this.state.rotated? "rotated" : 'normal'}/>
                            <Link to="/" ><img className={this.state.scroll > 30 ? "nav-image" : "nav-image nav-image-hidden"} src="https://i.etsystatic.com/isla/420b13/29519511/isla_500x500.29519511_ifsfvos4.jpg?version=0" /></Link>
                        </div>
                        <div className='navbar-right'>
                            {/* {this.props.firstName && this.props.firstName !== "Guest" ? <p className="list-item-nav">Hey there, {this.props.firstName}</p>: ''} */}
                            <img className="search-icon" src={require('../images/Search.png')} />
                            <Link className="list-item-nav" to="/cart"><div className={this.props.cart === 0 ? "shopping-cart-image" : "shopping-cart-item-image"}>{this.props.cart !== 0 ? <p className="cart-number">{this.props.cart}</p> : ''}</div></Link>
                            {/* <p className="cart-amount">{this.props.cart}</p> */}
                        </div>
                    </div>
                </div>
                <div className={this.state.rotated ? "drop-down menu-showing" : "drop-down menu-hidden"}>
                    
                    <Link className="list-item" to="/">Home</Link>
                    {this.props.firstName? <Link className="list-item" to="/account/myaccount">My Account</Link> :<Link className="list-item" to="/account/login">Login</Link>}
                    <Link className="list-item" to="/contact">Help</Link>
                    {this.state.admin ? <Link className="list-item" to="/admin">Admin</Link> : ''}
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
const {firstName, cart} = state
return {firstName, cart}
}
export default connect(mapStateToProps,{loginUser, countCart})(Nav)