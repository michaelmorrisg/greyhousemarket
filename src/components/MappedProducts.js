import React, {Component} from 'react'

class MappedProducts extends Component{
    constructor(){
        super()
        this.state = {
            mappedImages: [],
            hey: {}
        }
    }
async componentDidMount(props){
    let splitImages = this.props.productInfo.image.split(' ')
    await this.setState({
        mappedImages: splitImages
    })
    let myStyle = {
        backgroundImage : `url(${this.state.mappedImages[0]})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
    }
    this.setState({
        hey: myStyle
    })
}


render(props){
        return(
            <div className="product">
                <div className="image-div">
                    {this.props.productInfo.image && this.state.hey ? <div className="mapped-products-image" style={this.state.hey}></div>: ''}
                </div>
                <div className="lower-product">
                    <p>{this.props.productInfo.product_name}</p>
                    <p>${this.props.productInfo.price}</p>
                </div>
            </div>
        )
    }
}
export default MappedProducts