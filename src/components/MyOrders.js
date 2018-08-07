import React,{Component} from 'react'
import axios from 'axios'
import {findIndex} from 'lodash'

class MyOrders extends Component{
    constructor(){
        super()
        this.state = {
            orders: [],
            condensedOrders: []
        }
    }
    componentDidMount(){
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
                    tempObj = {product_name: this.state.orders[j].product_name, quantity: this.state.orders[j].quantity}
                    condensedArray[index].purchases.push(tempObj)
                }
            }
            console.log(condensedArray)
            for(let h=0; h<condensedArray.length;h++){
               let splitStuff = condensedArray[h].purchase_date.split(" ")
               console.log(splitStuff)
               splitStuff.splice(4,5)
               splitStuff[0] += ","
               splitStuff[2] += ","
               let joinStuff = splitStuff.join(" ")
               console.log(joinStuff)
               condensedArray[h].purchase_date = joinStuff
            }
            this.setState({
                condensedOrders: condensedArray
            })
    }
    render(){
        return (
            <div>
                {this.state.condensedOrders.map((element,i)=>{
                    return(
                        <div key={i}>
                            <p>{element.product_name}</p>
                            <p>{element.purchase_date}</p>
                            {this.state.condensedOrders[i].purchases.map((element,i)=>{
                                return(
                                    <div key={i}>
                                        {element.product_name} x {element.quantity}
                                    </div>
                                )
                            })}
                            <p>Total Order Amount: ${element.total_amount}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}
export default MyOrders