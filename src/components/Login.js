import React, {Component} from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import {loginUser,countCart} from '../ducks/reducer'
import {connect} from 'react-redux'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            toHome: false
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
    signIn(props){
        axios.get(`/api/userinfo/${this.state.email}/${this.state.password}`)
        .then((response)=>{
            if(response.data!=='Wrong username or password'){
            this.props.loginUser(response.data.response[0].first_name,response.data.response[0].last_name,response.data.response[0].id,response.data.response[0].email)
            this.props.toggle ? this.props.toggle() : ''
            this.setState({
                toHome: true
            })
        } else {
            alert('dumb')
        }
        axios.get('/api/totalcart')
        .then(res=>{
            if(res.data[0].sum!= null){
            this.props.countCart(res.data[0].sum)
        } else{
            this.props.countCart(0)
        }})

    })
    }


    render(props){
        return(
            <div className={this.props.show===false ? "loginHidden" : "loginShowing"}>
                <h2>Login</h2>
                <input onChange={(e)=>this.handleEmail(e.target.value)}placeholder="Email" />
                <input onChange={(e)=>this.handlePassword(e.target.value)}placeholder="Password" type="password" />
                <button onClick={()=>this.signIn()}>Sign In</button>
                <Link to="/account/register"><button>Register</button></Link>
                {this.state.toHome ? <Redirect to="/" />: ''}
            </div>
        )
    }
}

export default connect(null, {loginUser,countCart})(Login)