import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Nav extends Component{




    render(){
        return(
            <div>
                <Link to="/">Home</Link>
                Nav Bar!
                <Link to="/account/login">Login</Link>
                Cart
            </div>
        )
    }
}
export default Nav