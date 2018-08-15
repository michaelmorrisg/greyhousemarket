import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {loginUser, countCart} from '../ducks/reducer'


class SideDrawer extends Component {
    constructor(){
        super()
        this.state = {
            admin: false,
            firstName: '',
            lastName: '',
            id: 0,
            email: ''
        }
    }
    componentDidMount(props){
        this.setState({
            admin: this.props.admin,
            firstName: this.props.firstName
        })
    }
    componentDidUpdate(prevProps){
        if(this.props.admin !== prevProps.admin){
            this.setState({
                admin: this.props.admin,
            })
            console.log(this.state.admin, "updated!")
        }
        if(this.props.firstName !== prevProps.firstName){
            this.setState({
                firstName: this.props.firstName
            })
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


    render(props){
        return (
            <nav className={this.props.show ? "side-drawer-open side-drawer" :"side-drawer"}>
                <ul className="side-drawer-list">
                    <li onClick={()=>this.props.drawerClickHandler()} className="list-item"><Link to="/">Home</Link></li>
                    <li onClick={()=>this.props.drawerClickHandler()} className="list-item">{this.state.firstName && this.state.firstName !== "Guest"? <Link to="/account/myaccount">My Account</Link> : this.state.firstName ? <Link onClick={()=>this.logOut()} to="/">Log Out</Link> : <Link to="/account/login">Login</Link>}</li>
                    <li onClick={()=>this.props.drawerClickHandler()} className="list-item"><Link to="/contact">Help</Link></li>
                    <li onClick={()=>this.props.drawerClickHandler()} className="list-item">{this.state.admin ? <Link to="/admin">Admin</Link> : ''}</li>
                </ul>
            </nav>
            )
    }
}

function mapStateToProps(state){
    const {firstName,admin,lastName,id,email} = state
    return {firstName,admin,lastName,id,email}
}
export default connect(mapStateToProps, {countCart, loginUser})(SideDrawer)