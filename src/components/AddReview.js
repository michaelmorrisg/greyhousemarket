import React, {Component} from 'react'
import StarRatingComponent from 'react-star-rating-component'
import axios from 'axios'
import {debounce} from 'lodash'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import Swal from 'sweetalert2'

class AddReview extends Component {
    constructor(){
        super()
        this.state = {
            rating: 3,
            message: '',
            toHome: false
        }
    }


onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue})

}
submitReview(props){
    axios.post(`/api/submitreview/${this.props.match.params.id}`,({message:this.state.message,rating:this.state.rating, name:this.props.firstName + ' ' + this.props.lastName}))
    .then(res=>{
        Swal({
            type: 'success',
            title: 'Yay!',
            text: "Thank you for your review!"
        })
        this.setState({
            toHome: true
        })
    })

}
handleChange = debounce((input)=>{
    this.setState({
        message: input
    })
},1000)


    render(){
        return (
            <div className="review-main">
                <StarRatingComponent
                name='rateproduct'
                starCount={5}
                value={this.state.rating}
                onStarClick = {this.onStarClick.bind(this)} />
                <textarea onChange={(e)=>this.handleChange(e.target.value)} className="review-field" placeholder="Tell everyone what you think!"></textarea>
                <button className="addtocart-button" onClick={()=>this.submitReview()}>Submit</button>
                {this.state.toHome ? <Redirect to="/"/> : ''}
            </div>
        )
    }
}
function mapStateToProps(state){
    const {firstName,lastName} = state
    return {firstName,lastName}
}
export default connect(mapStateToProps)(AddReview)