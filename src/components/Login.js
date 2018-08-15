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
    componentDidMount(props){
        this.setState({
            stayOnPage: this.props.modal
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
    signIn(props){
        axios.get(`/api/userinfo/${this.state.email}/${this.state.password}`)
        .then((response)=>{
            if(response.data!=='Wrong username or password'){
            this.props.loginUser(response.data.response[0].first_name,response.data.response[0].last_name,response.data.response[0].id,response.data.response[0].email,response.data.response[0].admin)
            this.props.toggle ? this.props.toggle() : ''
            {
                this.setState({
                toHome: true
            })
            }
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
            <div className={this.props.show===false ? "loginHidden" : this.props.show===true && window.location.hash !== "#/account/login" ? "login login-modal" : "login"}>
                <h2 className="login-register-title">Login</h2>
                {console.log(window.location.hash)}
                <input className={window.location.hash === "#/account/login" ? "main-login-input" : ''} onChange={(e)=>this.handleEmail(e.target.value)}placeholder="Email" />
                <input className={window.location.hash === "#/account/login" ? "main-login-input" : ''}  onChange={(e)=>this.handlePassword(e.target.value)}placeholder="Password" type="password" />
                <div>
                <button className={window.location.hash === "#/account/login" ? "main-login-button" : ''} onClick={()=>this.signIn()}>Sign In</button>
                <div className="line-container">
                <div className="line"></div>
                <h5 id="or">Or</h5>
                <div className="line"></div>
                </div>
                <Link to="/account/register"><button className={window.location.hash === "#/account/login" ? "main-register-button" : ''}>Register</button></Link>
                </div>
                {this.state.toHome ? <Redirect to="/" />: ''}
            </div>
        )
    }
}

export default connect(null, {loginUser,countCart})(Login)