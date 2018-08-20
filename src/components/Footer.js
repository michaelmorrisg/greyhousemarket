import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebookSquare,faPinterest, faTwitter} from '@fortawesome/free-brands-svg-icons'


export default class Footer extends Component {



    render(){
        return (
            <div className="footer-main">
            <div className="footer-border"></div>
            <div className="secondary-border-footer"></div>
            <div className="footer-content">
            <div className="footer-left">
                <Link className="copyright" to="/contact">Contact Us</Link>
                <p className="copyright">©2018 TheGreyHouseMarket</p>
            </div>
            <div className="footer-right">
            <div className="social-media-icons">
            <a href="https://www.facebook.com" target="_blank"><FontAwesomeIcon className="grow" icon={faFacebookSquare} size="2x" color='white'/></a>
            <a href="https://www.pinterest.com" target="_blank"><FontAwesomeIcon className="grow" icon={faPinterest} size="2x" color='white'/></a>
            <a href="https://www.twitter.com" target="_blank"><FontAwesomeIcon className="grow" icon={faTwitter} size="2x" color='white'/></a>
            </div>
            </div>
            </div>
            </div>
        )
    }
}