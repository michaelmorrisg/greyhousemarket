import React, {Component} from 'react'
import {Link} from 'react-router-dom'


class Home extends Component{



    render(){
        return(
            <div>
                <div>
                    <img className="main-logo" src="https://i.etsystatic.com/isla/420b13/29519511/isla_500x500.29519511_ifsfvos4.jpg?version=0"/>
                    <h4 className="main-banner">One-stop shop for all your vinyl decal needs</h4>
                </div>
                <div className="categories">
                    <div className="category-rows">
                        <Link to="/nails" className="category-text" >
                            <div className="category-container">
                                <div className="upper-div-category"></div>
                                <div className="lower-div-category">Nail Decals</div>
                            </div>
                        </Link>
                        <Link to="/walls" className="category-text">
                            <div className="category-container">
                                <div className="upper-div-category"></div>
                                <div className="lower-div-category">Home Decor</div>
                            </div>
                        </Link>
                    </div>
                    <div className="category-rows">
                        <Link to="/kids" className="category-text">
                            <div className="category-container">
                                <div className="upper-div-category"></div>
                                <div className="lower-div-category">Kid Decals</div>
                            </div>
                        </Link>
                        <Link to="/car" className="category-text">
                            <div className="category-container">
                                <div className="upper-div-category"></div>
                                <div className="lower-div-category">Car Decals</div>
                            </div>
                        </Link>
                    </div>
                    <div className="category-rows">
                        <Link to="/seasonal" className="category-text">
                            <div className="category-container">
                                <div className="upper-div-category"></div>
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