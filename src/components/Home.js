import React, {Component} from 'react'
import {Link} from 'react-router-dom'




class Home extends Component{

    componentDidMount(){
        window.scrollTo(0,0)
    }



    render(){
        return(
            <div className="home-main">
                <div>
                    <img className="main-logo" src="https://i.etsystatic.com/isla/420b13/29519511/isla_500x500.29519511_ifsfvos4.jpg?version=0"/>
                    <h4 className="main-banner">One-stop shop for all your vinyl decal needs</h4>
                </div>
                <div className="categories">
                    <div className="category-rows">
                        <Link to="/nails" className="category-text" >
                            <div className="category-container">
                                <div className="upper-div-category" style={{backgroundImage:'url("https://img.etsystatic.com/il/55c5b8/681726744/il_340x270.681726744_6926.jpg?version=2")'}}></div>
                                <div className="lower-div-category">Nail Decals</div>
                            </div>
                        </Link>
                        <Link to="/walls" className="category-text">
                            <div className="category-container">
                                <div className="upper-div-category" style={{backgroundImage:'url("https://img.etsystatic.com/il/d2aa25/726610156/il_340x270.726610156_aasl.jpg?version=1")'}}></div>
                                <div className="lower-div-category">Home Decor</div>
                            </div>
                        </Link>
                    </div>
                    <div className="category-rows">
                        <Link to="/kids" className="category-text">
                            <div className="category-container">
                                <div className="upper-div-category" style={{backgroundImage:'url("https://img.etsystatic.com/il/8aa400/416123157/il_340x270.416123157_kbr0.jpg?version=0")'}}></div>
                                <div className="lower-div-category">Kid Decals</div>
                            </div>
                        </Link>
                        <Link to="/car" className="category-text">
                            <div className="category-container">
                                <div className="upper-div-category" style={{backgroundImage:'url("https://img.etsystatic.com/il/8a8b65/726176496/il_340x270.726176496_lqrh.jpg?version=1")'}}></div>
                                <div className="lower-div-category">Car Decals</div>
                            </div>
                        </Link>
                    </div>
                    <div className="category-rows">
                        <Link to="/seasonal" className="category-text">
                            <div className="category-container">
                                <div className="upper-div-category" style={{backgroundImage:'url("https://img.etsystatic.com/il/1dee6d/834610665/il_340x270.834610665_fgrk.jpg?version=1")'}}></div>
                                <div className="lower-div-category">Seasonal</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home