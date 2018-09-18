import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginUser, countCart} from '../ducks/reducer'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons'
import {faFacebookSquare,faPinterest, faTwitter} from '@fortawesome/free-brands-svg-icons'
import DrawerToggleButton from './DrawerToggleButton'
import {debounce} from 'lodash'
import SearchResults from './SearchResults'
import Backdrop from './Backdrop'

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
            scroll: 0,
            searchQuery: null,
            searchResults: [],
            searchActive: false
        }
        this.closeSearch = this.closeSearch.bind(this)
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
    handleSearch(input){
        this.setState({
            searchQuery: input
        })
        if(this.state.searchQuery !== ''){
        }
         axios.post('/api/getfilterproducts', {search:'%' + this.state.searchQuery + '%'})
        .then(res=>{
                    this.setState({
                        searchResults: res.data
                    })
                })
            
    }
    activateSearch(){
        this.setState({
            searchActive : this.state.searchActive ? false : true
        })
    }
    closeSearch(){
        this.setState({searchQuery:null})
    }

    debounced = debounce(this.handleSearch,1000)

    render(props){
        return(
            <div className="real-nav-full">
                <div className="full-nav-background">
                    <div className="full-nav-content">
                        <div className='navbar-left'>
                        <div className="full-nav-left-upper">
                        <a href="https://www.facebook.com" target="_blank"><FontAwesomeIcon className="grow nav-icon" icon={faFacebookSquare} size="2x" color='#333333'/></a>
                        <a href="https://www.pinterest.com" target="_blank"><FontAwesomeIcon className="grow nav-icon" icon={faPinterest} size="2x" color='#333333'/></a>
                        <a href="https://www.twitter.com" target="_blank"><FontAwesomeIcon className="grow nav-icon" icon={faTwitter} size="2x" color='#333333'/></a>
                        </div>
                        <div className="full-nav-left-lower">
                            <Link to="/" >Home</Link>
                            <Link to="/contact" >About Us</Link>
                        </div>
                        </div>
                        <div className="full-nav-mid">
                            <Link to="/" ><img className="full-nav-img grow" src="https://i.etsystatic.com/isla/420b13/29519511/isla_500x500.29519511_ifsfvos4.jpg?version=0"/></Link>
                        </div>
                        <div className='navbar-right'>
                        <div className="full-nav-right-upper">
                        <img onClick={()=>this.activateSearch()}className={this.state.searchActive ? "search-icon active-search-icon grow" : "search-icon grow"} src={require('../images/Search.png')} />
                            <input className={this.state.searchActive ? "active-input" : "hidden-input"} onChange={(e)=>this.debounced(e.target.value)}/>
                            <Link className="list-item-nav" to="/cart"><div className={this.props.cart === 0 ? "shopping-cart-image grow" : "shopping-cart-item-image grow"}>{this.props.cart !== 0 ? <p className="cart-number">{this.props.cart}</p> : ''}</div></Link>
                        </div>
                        <div className="full-nav-right-lower">
                            <Link to="/account/myaccount">My Account</Link>
                            <Link to="/account/login">Login</Link>
                            {/* <Link to="/contact">Contact Us</Link> */}
                        </div>
                        </div>
                        {this.state.searchQuery && this.state.searchActive ? <SearchResults searchQuery={this.state.searchQuery} results={this.state.searchResults} /> : ''}

                    </div>
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