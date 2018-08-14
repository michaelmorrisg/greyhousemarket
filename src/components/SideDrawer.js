import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'


class SideDrawer extends Component {
    constructor(){
        super()
        this.state = {
            admin: false,
            firstName: ''
        }
    }
    componentDidMount(props){
        this.setState({
            admin: this.props.admin,
            firstName: this.props.firstName
        })
    }
    componentDidUpdate(prevProps){
        if(this.props.admin !== prevProps.admin){
            this.setState({
                admin: this.props.admin,
            })
            console.log(this.state.admin, "updated!")
        }
        if(this.props.firstName !== prevProps.firstName){
            this.setState({
                firstName: this.props.firstName
            })
        }
    }


    render(props){
        return (
            <nav className={this.props.show ? "side-drawer-open side-drawer" :"side-drawer"}>
                <ul className="side-drawer-list">
                    <li onClick={()=>this.props.drawerClickHandler()} className="list-item"><Link to="/">Home</Link></li>
                    <li onClick={()=>this.props.drawerClickHandler()} className="list-item">{this.state.firstName? <Link to="/account/myaccount">My Account</Link> :<Link to="/account/login">Login</Link>}</li>
                    <li onClick={()=>this.props.drawerClickHandler()} className="list-item"><Link to="/contact">Help</Link></li>
                    <li onClick={()=>this.props.drawerClickHandler()} className="list-item">{this.state.admin ? <Link to="/admin">Admin</Link> : ''}</li>
                </ul>
            </nav>
            )
    }
}

function mapStateToProps(state){
    const {firstName,admin} = state
    return {firstName,admin}
}
export default connect(mapStateToProps)(SideDrawer)