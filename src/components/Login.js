import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {loginUser} from '../ducks/reducer'
import {connect} from 'react-redux'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
        }
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
    signIn(){
        axios.get(`/api/userinfo/${this.state.email}/${this.state.password}`)
        .then((response)=>{
            console.log(response)
            this.props.loginUser(response.data[0].first_name,response.data[0].last_name,response.data[0].id,response.data[0].email)
        })
    }


    render(){
        return(
            <div>
                <h2>Login</h2>
                <input onChange={(e)=>this.handleEmail(e.target.value)}placeholder="Email" />
                <input onChange={(e)=>this.handlePassword(e.target.value)}placeholder="Password" type="password" />
                <button onClick={()=>this.signIn()}>Sign In</button>
                <Link to="/account/register"><button>Register</button></Link>
            </div>
        )
    }
}

export default connect(null, {loginUser})(Login)