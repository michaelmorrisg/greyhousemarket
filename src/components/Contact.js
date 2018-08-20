import React, {Component} from 'react'
import axios from 'axios'
import Footer from './Footer'
import Swal from 'sweetalert2'

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
    componentDidMount(){
        window.scrollTo(0,0)
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
        .then(
            Swal({
                type: 'success',
                title: 'Woo!',
                text: 'Message sent!'
            })
        )
         this.setState({
            message: '',
            email: ''
        })
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
            <div>
            <div className="contact-main-div">
            <div className="questions-main">
                <h2>Top Questions</h2>
                <h4 className="question" onClick={()=>this.toggleState()}><span>{this.state.showCool ? '-  ' : '+  '}</span>Are you really this cool?</h4>
                <div className={this.state.showCool ? "showing-answer" : "hidden-answer" }><h5 className="answer">Yes. Yes we are.</h5></div>
                <h4 className="question" onClick={()=>this.toggleReturn()}><span>{this.state.showReturn ? '-  ' : '+  '}</span>What is your return policy?</h4>
                <div className={this.state.showReturn ? 'showing-answer' : 'hidden-answer'}><h5><b>We gladly accept returns</b></h5><h5>Contact me within 14 days of delivery
                    and ship the items back within 30 days for a full refund</h5></div>
                <h4 className="question" onClick={()=>this.toggleExchange()}><span>{this.state.showExchange ? '-  ' : '+  '}</span>Do you accept exchanges?</h4>
                <h5 className={this.state.showExchange ? 'showing-answer' : 'hidden-answer'}>We do not :( But please let us know if you have any issues with your order and we'll be happy to help!</h5>
                <div className="contact-form">
                <h2>Still have questions?</h2>
                <input onChange={(e)=>this.handleEmail(e.target.value)} placeholder="Your email address" value={this.state.email}/>
                <textarea onChange={(e)=>this.handleMessage(e.target.value)} placeholder="Your message" value={this.state.message}></textarea>
                <button className="addtocart-button" id="thinner-button" onClick={()=>this.sendMessage()}>Submit</button>
                </div>
            </div>
            </div>
            <Footer />
            </div>
        )
    }
}
export default Contact