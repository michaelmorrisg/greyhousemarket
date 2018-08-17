import React, {Component} from 'react'
import axios from 'axios'

class ForgotPass extends Component{
    constructor(){
        super()
        this.state = {
            forgotEmail: ''
        }
    }

handleEmail(input){
    this.setState({
        forgotEmail: input
    })
}
submitEmail(){
    axios.post('/api/lostpassword', {email:this.state.forgotEmail})
}


    render(){
        return (
            <div className="forgot-pass">
                <div className="inner">
                    <h5>Please enter your email and we'll send a temporary password within a couple minutes</h5>
                    <input onChange={(e)=>this.handleEmail(e.target.value)} className="main-login-input" id="larger-input" placeholder="email"/>
                    <button onClick={()=>this.submitEmail()} className="forgot-pass-button">Send Email</button>
                </div>
            </div>
        )
    }
}
export default ForgotPass