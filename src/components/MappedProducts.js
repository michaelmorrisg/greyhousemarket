import React from 'react'

export default function MappedProducts(props){
    return(
        <div>
            <p>{props.productInfo.image}</p>
            <p>{props.productInfo.product_name}</p>
            <p>{props.productInfo.price}</p>
        </div>
    )
}