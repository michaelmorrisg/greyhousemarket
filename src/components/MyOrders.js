import React,{Component} from 'react'
import axios from 'axios'
import {findIndex} from 'lodash'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import {Link, Redirect} from 'react-router-dom'


library.add(faStar)

class MyOrders extends Component{
    constructor(){
        super()
        this.state = {
            orders: [],
            condensedOrders: [],
            toLogIn: false
        }
    }
    componentDidMount(){
        window.scrollTo(0,0)
        axios.get('api/checkuser')
        .then(res=>{
            if(res.data === 'not logged in'){
                this.setState({
                    toLogIn : true
                })
            }
        })
        axios.get('/api/getorders')
            .then(res=>{
                this.setState({
                    orders: res.data
                })
                this.combinedOrders()
            })
    }
    combinedOrders(){
        let newArray = this.state.orders.map(element=>{
            return {total_amount:element.total_amount, purchase_date:element.purchase_date}
        })
        let condensedArray=[]
        for(let i=0;i<newArray.length;i++){
            let total = newArray[i].total_amount
            let date = newArray[i].purchase_date
            if (findIndex(condensedArray,{total_amount:total,purchase_date:date})===-1){
                condensedArray.push(newArray[i])
            }
        }
            for(let k=0; k<condensedArray.length;k++){
                condensedArray[k].purchases = []
            }
            for(let j=0; j<this.state.orders.length;j++){
                let myTotal = this.state.orders[j].total_amount
                let myDate = this.state.orders[j].purchase_date
                let tempObj = {}
                if(findIndex(condensedArray,{total_amount:myTotal,purchase_date:myDate})!==-1){
                    let index = findIndex(condensedArray,{total_amount:myTotal,purchase_date:myDate})
                    tempObj = {product_name: this.state.orders[j].product_name, quantity: this.state.orders[j].quantity, product_id:this.state.orders[j].products_id}
                    condensedArray[index].purchases.push(tempObj)
                }
            }
            for(let h=0; h<condensedArray.length;h++){
               let splitStuff = condensedArray[h].purchase_date.split(" ")
               splitStuff.splice(4,5)
               splitStuff[0] += ","
               splitStuff[2] += ","
               let joinStuff = splitStuff.join(" ")
               condensedArray[h].purchase_date = joinStuff
            }
            this.setState({
                condensedOrders: condensedArray
            })
    }
    render(){
        return (
            <div className="orders-main">
                {this.state.condensedOrders.map((element,i)=>{
                    return(
                        <div className="individual-order" key={i}>
                            <p>{element.product_name}</p>
                            <p className="bold">{element.purchase_date}</p>
                            {this.state.condensedOrders[i].purchases.map((element,i)=>{
                                return(
                                    <div className="product-review-div" key={i}>
                                        {element.product_name} x {element.quantity}
                                        <Link to={`/addreview/product/${element.product_id}`} ><FontAwesomeIcon icon="star" color="black"/></Link>
                                    </div>
                                )
                            })}
                            <p>Total Order Amount: ${element.total_amount}</p>
                        </div>
                    )
                })}
                {this.state.toLogIn ? <Redirect to="/account/login" /> : ''}
            </div>
        )
    }
}
export default MyOrders