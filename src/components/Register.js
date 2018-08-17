import React, {Component} from 'react'
import axios from 'axios'
import {loginUser} from '../ducks/reducer'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import swal from 'sweetalert2'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            toHome: false
        }
    }

    handleFirst(input){
        this.setState({
            firstName: input
        })
    }
    handleLast(input){
        this.setState({
            lastName: input
        })
    }
    handleEmail(input){
        this.setState({
            email: input
        })
    }
    handlePassword(input){
        this.setState({
            password: input
        })
    }
    registerUser(){
        if(this.state.firstName && this.state.lastName && this.state.email && this.state.password){
            axios.post(`/api/newuser`,{firstName:this.state.firstName,lastName:this.state.lastName,email:this.state.email,password:this.state.password})
            .then(res=>{
                if(res.data !== "User already exists"){
                    this.props.loginUser(res.data.response[0].first_name,res.data.response[0].last_name,res.data.response[0].id,res.data.response[0].email)
                    this.setState({
                        toHome: true
                    })
                } else {
                    swal({
                        title: 'Oops!',
                        text: "It looks like that email already exists",
                        type: 'error'
                    })
                }
            })
        } else {
            swal({
                title: ': /',
                text: "Please enter your info",
                type: "error"
            })
        }
    }


    render(){
        return(
            <div className="register-main">
            <h2 className="login-register-title">Register</h2>
                <div className="input-div">
                    <input className="main-login-input" onChange={(e)=>this.handleFirst(e.target.value)} placeholder="First Name" value={this.state.firstName}/>
                    <input className="main-login-input" onChange={(e)=>this.handleLast(e.target.value)} placeholder="Last Name" value={this.state.lastName}/>
                    <input className="main-login-input" onChange={(e)=>this.handleEmail(e.target.value)} placeholder="Email" value={this.state.email}/>
                    <input className="main-login-input" onChange={(e)=>this.handlePassword(e.target.value)} placeholder="Password" value={this.state.password} type="password"/>
                    <button className="main-login-button" onClick={()=>this.registerUser()}>Create</button>
                </div>
                {this.state.toHome ? <Redirect to="/"/> : ''}
            </div>
        )
    }
}
export default connect(null, {loginUser})(Register)