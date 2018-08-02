import React, {Component} from 'react'
import Login from './Login'
import axios from 'axios'
import {loginUser} from '../ducks/reducer'
import {connect} from 'react-redux'

class Modal extends Component{
    constructor(){
        super()
        this.state = {
            showLogIn: false
        }
    }
    showLogIn(){
        this.setState({
            showLogIn: true
        })
    }
    continueAsGuest(props){
        axios.post('/api/addguest')
        .then(res=>{
            this.props.loginUser(res.data[0].first_name,res.data[0].last_name,res.data[0].id,res.data[0].email)
            this.props.toggle()
        })
    }


    render(props){
        return (
            <div className={this.props.class===false? 'hidden': 'showing'}>
            <p>Log in or Continue as a guest</p>
            <button onClick={()=>this.showLogIn()}>Log in</button>
            <button onClick={()=>this.continueAsGuest()}>Continue as guest</button>
            <Login show={this.state.showLogIn} />
            
            </div>
        )
    }
}
export default connect(null, {loginUser})(Modal)