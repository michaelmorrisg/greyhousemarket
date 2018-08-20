import React, {Component} from 'react'
import axios from 'axios'
import {findIndex} from 'lodash'

class Orders extends Component{
    constructor(){
        super()
        this.state = {
            orders: [],
            myCondensedOrders: []
        }
    }
    componentDidMount(){
        axios.get('/api/getadminorders')
            .then(res=>{
                this.setState({
                    orders: res.data
                })
                let condensedOrders =[]
                for(let i=0;i<this.state.orders.length;i++){
                    let purchaseId = this.state.orders[i].purchase_id
                    if(findIndex(condensedOrders,{purchase_id: purchaseId})===-1){
                        condensedOrders.push(this.state.orders[i])
                    }
                }
                        this.setState({
                            myCondensedOrders: condensedOrders
                        })
                        for(let j=0;j<condensedOrders.length;j++){
                            condensedOrders[j].purchases = []
                        }
                        for(let k=0;k<this.state.orders.length;k++){
                            let purchaseId = this.state.orders[k].purchase_id
                            if(findIndex(condensedOrders,{purchase_id:purchaseId})!==-1){
                                let index = findIndex(condensedOrders,{purchase_id:purchaseId})
                                condensedOrders[index].purchases.push(this.state.orders[k])
                            }
                        }
                        this.setState({
                            myCondensedOrders: condensedOrders
                        })
                })
    }
    fulfillOrder(id){
        let purchaseOrder = []
        for(let i = 0;i<this.state.myCondensedOrders.length; i++){
            if(this.state.myCondensedOrders[i].purchase_id === id){
                purchaseOrder.push(this.state.myCondensedOrders[i])
            }
        }
        for(let k = 0; k<purchaseOrder[0].purchases.length; k++) {
            purchaseOrder[0].purchases[k].purchases[k].purchases = []
        }
        axios.post(`/api/shippingconfirmationemail/${id}`, {order:purchaseOrder})
        .then(res=>{
        })
        axios.put(`/api/fulfillorder/${id}`)
        .then(res=>{
            axios.get('/api/getadminorders')
            .then(res=>{
                this.setState({
                    orders: res.data
                })
                let condensedOrders =[]
                for(let i=0;i<this.state.orders.length;i++){
                    let purchaseId = this.state.orders[i].purchase_id
                    if(findIndex(condensedOrders,{purchase_id: purchaseId})===-1){
                        condensedOrders.push(this.state.orders[i])
                    }
                }
                        this.setState({
                            myCondensedOrders: condensedOrders
                        })
                        for(let j=0;j<condensedOrders.length;j++){
                            condensedOrders[j].purchases = []
                        }
                        for(let k=0;k<this.state.orders.length;k++){
                            let purchaseId = this.state.orders[k].purchase_id
                            if(findIndex(condensedOrders,{purchase_id:purchaseId})!==-1){
                                let index = findIndex(condensedOrders,{purchase_id:purchaseId})
                                condensedOrders[index].purchases.push(this.state.orders[k])
                            }
                        }
                        this.setState({
                            myCondensedOrders: condensedOrders
                        })
                })
        })
    }


    render(){
        return(
            <div>
                {this.state.myCondensedOrders[0] ? this.state.myCondensedOrders.map((element,i)=>{
                    return(
                        <div className="admin-order" key={element.purchase_id}>
                            <p>{element.first_name} {element.last_name}</p>
                            <p>{element.email === "Guest" ? '': element.email}</p>
                            <p>{element.purchase_date}</p>
                            {this.state.myCondensedOrders[i].purchases ? this.state.myCondensedOrders[i].purchases.map((element,i)=>{
                                return(
                                    <div key={i}>
                                        <p className="admin-product">{element.product_name}</p>
                                        <p>Color: {element.color}</p>
                                        <p>Quantity: {element.quantity}</p>
                                    </div>
                                )
                            }): ''}
                            <button className="fulfill-button" onClick={()=>this.fulfillOrder(element.purchase_id)}>Fulfill Order</button>
                        </div>
                    )
                }): <h3>You're all caught up!</h3>}

            </div>
        )
    }
}
export default Orders