import React, {Component} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

class UpdatePassword extends Component{
    constructor(){
        super()
        this.state = {
            oldPass: '',
            newPass: ''
        }
    }
handleOld(input){
    this.setState({
        oldPass: input
    })
}
handleNew(input){
    this.setState({
        newPass: input
    })
}
submitPass(){
    axios.put('/api/updatepassword',{oldPass: this.state.oldPass, newPass: this.state.newPass})
    .then(res=>{
        // console.log(res.data)
        if(res.data === 'success!'){
            Swal({
                type: 'success',
                title: "Woo!",
                text: "Password Updated!"
            })
        } else {
            Swal({
                type: 'error',
                title: "Hrrmm",
                text: "It looks like your old password is wrong"
            })
        }
    })
}



    render(){
        return (
            <div>
                <div className="update-pass-main">
                <input onChange={(e)=>this.handleOld(e.target.value)} className="main-login-input" placeholder="Current Password" type="password"/>
                <input onChange={(e)=>this.handleNew(e.target.value)} className="main-login-input" placeholder="New Password" type="password"/>
                <div><button onClick={()=>this.submitPass()}className="main-register-button" id="smaller-button">Submit Change</button></div>
                </div>
            </div>
        )
    }
}
export default UpdatePassword