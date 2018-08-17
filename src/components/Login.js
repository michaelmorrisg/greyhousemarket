import React, {Component} from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import {loginUser,countCart} from '../ducks/reducer'
import {connect} from 'react-redux'
import Swal from 'sweetalert2'
import Backdrop from './Backdrop';
import ForgotPass from './ForgotPass'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            toHome: false,
            forgotPass: false
        }
    }
    componentDidMount(props){
        window.scrollTo(0,0)
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
        if(!this.state.email || !this.state.password){
            Swal({
                title: ": /",
                text: "Please enter a valid email and password",
                type: 'error'
            })
        } else{
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
            Swal({
                title: "Oops!",
                text: "Looks like your email and password don't match",
                type: 'error'
            })
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
}


    render(props){
        return(
            <div className={this.props.show===false ? "loginHidden" : this.props.show===true && window.location.hash !== "#/account/login" ? "login login-modal" : "login"}>
                <h2 className={window.location.hash === "#/account/login" ? "login-register-title" : "modal-login-title" }>Login</h2>
                <input className={window.location.hash === "#/account/login" ? "main-login-input" : "modal-login-input"} onChange={(e)=>this.handleEmail(e.target.value)}placeholder="Email" />
                <input className={window.location.hash === "#/account/login" ? "main-login-input" : 'modal-login-input'}  onChange={(e)=>this.handlePassword(e.target.value)}placeholder="Password" type="password" />
                <div>
                    <button className="forgot-pass-button" onClick={()=>this.setState({forgotPass: !this.state.forgotPass})}>Forgot your password?</button>
                </div>
                <div>
                    {this.state.forgotPass ? <ForgotPass/> : ''}
                </div>
                <div>
                <button className={window.location.hash === "#/account/login" ? "main-login-button" : 'modal-button'} onClick={()=>this.signIn()}>Sign In</button>
                <div className="line-container">
                <div className="line"></div>
                <h5 id={window.location.hash === "#/account/login" ? "or" : "modal-or"}>Or</h5>
                <div className="line"></div>
                </div>
                <Link to="/account/register"><button className={window.location.hash === "#/account/login" ? "main-register-button" : 'modal-button'}>Register</button></Link>
                </div>
                {this.state.toHome ? <Redirect to="/" />: ''}
            </div>
        )
    }
}

export default connect(null, {loginUser,countCart})(Login)