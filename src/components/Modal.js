import React, {Component} from 'react'
import Login from './Login'
import axios from 'axios'
import {loginUser} from '../ducks/reducer'
import {connect} from 'react-redux'

class Modal extends Component{
    constructor(){
        super()
        this.state = {
            showLogIn: false,
            showModal: true
        }

    this.showModal = this.showModal.bind(this)
    }
    showLogIn(){
        this.setState({
            showLogIn: true
        })
    }
    showModal(){
        this.setState({
            showModal: false
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
            <div className={this.props.class===false? 'hidden': this.props.class===true && this.state.showLogIn=== false ? 'showing' : 'showing tall'}>
            {/* <p>Log in or Continue as a guest</p> */}
            <div className={this.state.showLogIn === false ? "modal-content" : "modal-content-login"}>
            <button className="modal-button" onClick={()=>this.showLogIn()}>Log in</button>
            <div className="space"/>
            <p>or</p>
            <button className="modal-button" onClick={()=>this.continueAsGuest()}>Continue as guest</button>
            </div>
            {this.state.showLogIn ? <Login modal={this.props.class} show={this.state.showLogIn} toggle={this.props.toggle} />: ''}
            
            </div>
        )
    }
}
export default connect(null, {loginUser})(Modal)