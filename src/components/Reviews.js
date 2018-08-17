import React, {Component} from 'react'
import axios from 'axios'
import StarRatingComponent from 'react-star-rating-component'
import {Link} from 'react-router-dom'

class Reviews extends Component {
    constructor(){
        super()
        this.state = {
            reviews: [],
            averageReview: 0
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.productInfo !== prevProps.productInfo){
            axios.get(`/api/getreviews/${this.props.productInfo[0].products_id}`)
            .then(res=>{
                for(let i = 0; i<res.data.length; i++){
                    res.data[i].date = res.data[i].date.split(' ')
                    res.data[i].date.splice(4,5)
                    res.data[i].date.shift()
                    res.data[i].date = res.data[i].date.join(' ')
                }
                this.setState({
                    reviews: res.data
                })
                axios.get(`/api/averagereviews/${this.props.productInfo[0].products_id}`)
                .then(res=>{
                    this.setState({
                        averageReview : Number(res.data[0].avg).toFixed(2)
                    })
            })
            })
        }
    }


    render(props){
        return (
            <div className="main-review-div">
                <h2 className="single-product-header">Reviews</h2>
                {this.state.reviews[0] ? '' : 'No reviews for this yet!'}
                {this.state.reviews[0] ? <p className="description">({this.state.averageReview} Average rating)</p>: ''}
                {this.state.reviews.map((element,i)=>{
                    return (
                        <div className="single-product-body-text review-div" key={i}>
                            <div className="review-upper-div">
                                <div className="reviews-namedate-div">
                                    <p className="reviews-name">{element.user_name}</p>
                                    <p className="reviews-date">{element.date}</p>
                                </div>
                                <StarRatingComponent
                                name="Rating" 
                                value={element.rating}
                                />
                            </div>
                            <p>{element.message}</p>
                        </div>
                    )
                })}
                <div>
                    <h4 id="tried-it-text">Tried it and loved it?</h4>
                    <p>Go to <Link className="your-orders" to="/account/myaccount/myorders">your orders</Link> to leave a review!</p>
                </div>
            </div>
        )
    }
}
export default Reviews