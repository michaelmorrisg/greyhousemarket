import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Footer from './Footer'
import {Carousel} from 'react-responsive-carousel'




class Home extends Component{
    constructor(){
        super()
        this.state = {
            images: ['https://i.etsystatic.com/7076417/r/il/d2aa25/726610156/il_570xN.726610156_aasl.jpg', 'https://i.etsystatic.com/7076417/r/il/1c44ef/985238720/il_570xN.985238720_41tn.jpg','https://i.etsystatic.com/7076417/r/il/44be74/590830724/il_570xN.590830724_a6fq.jpg']
        }
    }

    componentDidMount(){
        window.scrollTo(0,0)
    }



    render(){
        return(
            <div className="home-main">
                <div className="main-banner-div">
                    <img className="main-logo" src="https://i.etsystatic.com/isla/420b13/29519511/isla_500x500.29519511_ifsfvos4.jpg?version=0"/>
                    <h4 className="main-banner">One-stop shop for all your vinyl decal needs</h4>
                    <div className="main-banner-div-left">
                    <img className="full-banner-text" src={require('../images/BannerText.png')}/>
                    <h4>One-stop shop for all your vinyl decal needs</h4>
                    </div>
                    <div className="main-banner-div-right">
                    <Carousel autoPlay={true} infiniteLoop={true} showIndicators={false} showArrows={false} showStatus={false} showThumbs={false} stopOnHover={false} transitionTime={1000} className="carousel-image-full">{this.state.images.map((element,i)=>{
                    let image = {
                                height: '450px',
                                width: '100%',
                                backgroundImage : `url(${element})`,
                                backgroundSize : 'cover',
                                backgroundRepeat : 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundColor: 'white'
                    }
                    return(
                        <div className="full-carousel-div">
                            <div className="full-carousel-img" style={image}></div>
                        </div>
                    )
                }
                )}</Carousel>
                    </div>
        
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
                                <div className="lower-div-category">Wall Decals</div>
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
                        <Link to="/home-decor" className="category-text">
                            <div className="category-container">
                            <div className="background-test"></div>
                                <div className="upper-div-category" style={{backgroundImage:'url("https://i.etsystatic.com/7076417/r/il/a15c11/1275000966/il_570xN.1275000966_k4jp.jpg")'}}></div>
                                <div className="lower-div-category">Home Decor</div>
                            </div>
                        </Link>
                    </div>
                </div>
                {/* FULL SCREEN LAYOUT BELOW */}
                <div className="categories categories-full">
                    <div className="category-rows">
                        <Link to="/nails" className="category-text" >
                            <div className="category-container">
                            <div className="background-test"></div>
                                <div className="upper-div-category" style={{backgroundImage:'url("https://img.etsystatic.com/il/55c5b8/681726744/il_340x270.681726744_6926.jpg?version=2")'}}></div>
                                <div className="lower-div-category">Nail Decals</div>
                            </div>
                        </Link>
                        <Link to="/walls" className="category-text">
                            <div className="category-container">
                            <div className="background-test"></div>
                                <div className="upper-div-category" style={{backgroundImage:'url("https://img.etsystatic.com/il/d2aa25/726610156/il_340x270.726610156_aasl.jpg?version=1")'}}></div>
                                <div className="lower-div-category">Wall Decals</div>
                            </div>
                        </Link>
                        <Link to="/kids" className="category-text">
                            <div className="category-container">
                            <div className="background-test"></div>
                                <div className="upper-div-category" style={{backgroundImage:'url("https://img.etsystatic.com/il/8aa400/416123157/il_340x270.416123157_kbr0.jpg?version=0")'}}></div>
                                <div className="lower-div-category">Kid Decals</div>
                            </div>
                        </Link>
                    </div>
                    <div className="category-rows">

                        <Link to="/car" className="category-text">
                            <div className="category-container">
                            <div className="background-test"></div>
                                <div className="upper-div-category" style={{backgroundImage:'url("https://img.etsystatic.com/il/8a8b65/726176496/il_340x270.726176496_lqrh.jpg?version=1")'}}></div>
                                <div className="lower-div-category">Car Decals</div>
                            </div>
                        </Link>
                        <Link to="/seasonal" className="category-text">
                            <div className="category-container">
                            <div className="background-test"></div>
                                <div className="upper-div-category" style={{backgroundImage:'url("https://img.etsystatic.com/il/1dee6d/834610665/il_340x270.834610665_fgrk.jpg?version=1")'}}></div>
                                <div className="lower-div-category">Seasonal</div>
                            </div>
                        </Link>
                        <Link to="/home-decor" className="category-text">
                            <div className="category-container">
                            <div className="background-test"></div>
                                <div className="upper-div-category" style={{backgroundImage:'url("https://i.etsystatic.com/7076417/r/il/a15c11/1275000966/il_570xN.1275000966_k4jp.jpg")'}}></div>
                                <div className="lower-div-category">Home Decor</div>
                            </div>
                        </Link>
                    </div>
                    <div className="category-rows" id="third-row">

                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
export default Home