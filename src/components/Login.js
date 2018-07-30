import React, {Component} from 'react'

class Login extends Component {





    render(){
        return(
            <div>
                <h2>Login</h2>
                <input placeholder="Email" />
                <input placeholder="Password" />
                <button>Sign In</button>
            </div>
        )
    }
}
export default Login