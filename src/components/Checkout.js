import React,{Component} from 'react'
import Order from './Order'
import {connect} from 'react-redux'
import {debounce} from 'lodash'
import {updateShipping} from '../ducks/reducer'
import {SplitButton,MenuItem,DropdownButton,ButtonProps} from 'react-bootstrap'

class Checkout extends Component {
    constructor(props){
        super()
        this.state = {
            email: props.email!=="Guest" ? props.email : '',
            firstName: props.firstName!=="Guest" ? props.firstName : '',
            lastName: props.lastName!=="Guest" ? props.lastName : '',
            address1: '',
            address2: '',
            zipCode: '',
            city: '',
            myState: '',
            states: []
        }
    }
    componentDidMount(){
        this.setState({
            states: ["Alaska",
            "Alabama",
            "Arkansas",
            "Arizona",
            "California",
            "Colorado",
            "Connecticut",
            "District of Columbia",
            "Delaware",
            "Florida",
            "Georgia",
            "Guam",
            "Hawaii",
            "Iowa",
            "Idaho",
            "Illinois",
            "Indiana",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Massachusetts",
            "Maryland",
            "Maine",
            "Michigan",
            "Minnesota",
            "Missouri",
            "Mississippi",
            "Montana",
            "North Carolina",
            "North Dakota",
            "Nebraska",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "Nevada",
            "New York",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Pennsylvania",
            "Puerto Rico",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Virginia",
            "Virgin Islands",
            "Vermont",
            "Washington",
            "Wisconsin",
            "West Virginia",
            "Wyoming"]
        })
    }
    handleEmail(input){
        this.setState({
            email: input
        })
        this.sendToRedux()
    }
    handleFirst(input){
        this.setState({
            firstName: input
        })
        this.sendToRedux()   
    }
    handleLast(input){
        this.setState({
            lastName: input
        })
        this.sendToRedux()
    }
    handleAddress1(input){
        this.setState({
            address1: input
        })
        this.sendToRedux()
    }
    handleAddress2(input){
        this.setState({
            address2: input
        })
        this.sendToRedux()
    }
    handleZipCode(input){
        this.setState({
            zipCode: input
        })
        this.sendToRedux()
    }
    handleCity(input){
        this.setState({
            city: input
        })
        this.sendToRedux()
        
    }
    handleState(input){
        this.setState({
            myState: input
        })
        this.sendToRedux()
    }
    sendToRedux = debounce(()=>{
            this.props.updateShipping(this.state.email,this.state.firstName,this.state.lastName,this.state.address1,this.state.address2,this.state.zipCode,this.state.city,this.state.myState)
        }, 1000
    )

    render(){
        return(
            <div className="checkout">
            <div className='checkout-left'>
                <h1>Checkout</h1>
                <div className="shipping-info">
                <h2>Shipping Address</h2>
                <h3>Email Address</h3>
                <input className="checkout-input email" onChange={(e)=>this.handleEmail(e.target.value)} value={this.state.email}/>
                <div className="first-name-last-name-checkout">
                    <div>
                        <h3>First Name</h3>
                        <input className="checkout-input" onChange={(e)=>this.handleFirst(e.target.value)} value={this.state.firstName}/>
                    </div>
                    <div>
                        <h3>Last Name</h3>
                        <input className="checkout-input" onChange={(e)=>this.handleLast(e.target.value)} value={this.state.lastName}/>
                    </div>
                </div>
                <h3>Address</h3>
                <input className="checkout-input email" onChange={(e)=>this.handleAddress1(e.target.value)} value={this.state.address1}/>
                <h3>Address 2 (Optional)</h3>
                <input className="checkout-input email" onChange={(e)=>this.handleAddress2(e.target.value)} value={this.state.address2}/>
                <div className="first-name-last-name-checkout">
                    <div>
                        <h3>Zip Code</h3>
                        <input className="checkout-input" onChange={(e)=>this.handleZipCode(e.target.value)} value={this.state.zipCode}/>
                    </div>
                    <div>
                        <h3>City</h3>
                        <input className="checkout-input" onChange={(e)=>this.handleCity(e.target.value)} value={this.state.city}/>
                    </div>
                </div>
                <h3>State</h3>
                <DropdownButton
                bsStyle="info"
                bsSize="large"
                className="state-button"
                title={this.state.myState ? this.state.myState : 'State'}
                dropup={true}>
                {this.state.states.map(element=>{
                    return (
                        <MenuItem onClick={()=>this.handleState(element)}>{element}</MenuItem>
                    )
                })}
                </DropdownButton>
                </div>
                </div>
                <Order />
            </div>
        )
    }
}
function mapStateToProps(state){
    const {email,firstName,lastName} = state
    return {email,firstName,lastName}
}
export default connect(mapStateToProps,{updateShipping})(Checkout)