import React, {Component} from 'react'
import axios from 'axios'
import StarRatingComponent from 'react-star-rating-component'

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
                console.log(res.data)
                for(let i = 0; i<res.data.length; i++){
                    res.data[i].date = res.data[i].date.split(' ')
                    res.data[i].date.splice(4,5)
                    res.data[i].date.shift()
                    res.data[i].date = res.data[i].date.join(' ')
                    console.log(res.data[i].date, i)
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
            <div>
            {console.log(Date())}
            {console.log(this.state.reviews)}
                <h2>Reviews</h2>
                {this.state.averageReview !== 0 ? <p>({this.state.averageReview} Average rating)</p>: ''}
                {this.state.reviews.map((element,i)=>{
                    return (
                        <div key={i}>
                            <div>
                                <p>{element.user_name}</p>
                                <StarRatingComponent
                                name="Rating" 
                                value={element.rating}
                                />
                            </div>
                            <p>{element.message}</p>
                            <p>{element.date}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}
export default Reviews