import React, {Component} from 'react'
import axios from 'axios'
import {loginUser} from '../ducks/reducer'
import {connect} from 'react-redux'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
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
        console.log(this.state.password)
    }
    registerUser(){
        axios.post(`/api/newuser`,{firstName:this.state.firstName,lastName:this.state.lastName,email:this.state.email,password:this.state.password})
        .then(res=>{
            console.log(res)
            this.props.loginUser(res.data[0].first_name,res.data[0].last_name,res.data[0].id,res.data[0].email)
        })
    }


    render(){
        return(
            <div>
                <input onChange={(e)=>this.handleFirst(e.target.value)} placeholder="First Name" value={this.state.firstName}/>
                <input onChange={(e)=>this.handleLast(e.target.value)} placeholder="Last Name" value={this.state.lastName}/>
                <input onChange={(e)=>this.handleEmail(e.target.value)} placeholder="Email" value={this.state.email}/>
                <input onChange={(e)=>this.handlePassword(e.target.value)} placeholder="Password" value={this.state.password} type="password"/>
                <button onClick={()=>this.registerUser()}>Create</button>
            </div>
        )
    }
}
export default connect(null, {loginUser})(Register)