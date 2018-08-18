import React, {Component} from 'react'
import Footer from './Footer'
import cloud from '../images/cloud.svg'
import cloudy from '../images/cloudy.png'

class Confirmation extends Component {
componentDidMount(){
    window.scrollTo(0,0)
}


    render(){
        return (
            <div className="confirmation-main">
                <h2>Wahoo! Thanks for your purchase!</h2>
                <p>You should be getting an email soon with a confirmation of your order!</p>
                <div className='center'>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                <div className="gray"></div>
                </div>
                {/* <img className="cloud" src={`${cloudy}`}/> */}
                <Footer />
            </div>
        )
    }
}
export default Confirmation