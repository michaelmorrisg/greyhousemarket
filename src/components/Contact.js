import React, {Component} from 'react'
import axios from 'axios'

class Contact extends Component{
    constructor(){
        super()
        this.state = {
            email: '',
            message: '',
            showCool: false,
            showReturn: false,
            showExchange: false
        }
    }
    handleEmail(input){
        this.setState({
            email: input
        })
    }
    handleMessage(input){
        this.setState({
            message: input
        })
    }
    sendMessage(){
        axios.post('/api/sendcontactemail',{email: this.state.email,message: this.state.message})
    }
    toggleState(){
        this.setState({
            showCool: !this.state.showCool
        })
    }
    toggleReturn(){
        this.setState({
            showReturn: !this.state.showReturn
        })
    }
    toggleExchange(){
        this.setState({
            showExchange: !this.state.showExchange
        })
    }
    render(){
        return (
            <div className="questions-main">
                <h2>Top Questions</h2>
                <h4 className="question" onClick={()=>this.toggleState()}>Are you really this cool?</h4>
                <div className={this.state.showCool ? "showing-answer" : "hidden-answer" }><h5 className="answer">Yes. Yes we are.</h5></div>
                <h4 onClick={()=>this.toggleReturn()}>What is your return policy?</h4>
                {this.state.showReturn===true ? <div><h5><b>We gladly accept returns</b></h5><h5>Contact me within 14 days of delivery
                    and ship the items back within 30 days for a full refund</h5></div> : ''}
                <h4 onClick={()=>this.toggleExchange()}>Do you accept exchanges?</h4>
                {this.state.showExchange===true ? <h5>We do not :( But please let us know if you have any issues with your order and we'll be happy to help!</h5> : ''}
                <h2>Still have questions?</h2>
                <input onChange={(e)=>this.handleEmail(e.target.value)} placeholder="Your email address"/>
                <input onChange={(e)=>this.handleMessage(e.target.value)} placeholder="Your message"/>
                <button onClick={()=>this.sendMessage()}>Submit</button>

            </div>
        )
    }
}
export default Contact