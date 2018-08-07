import React from 'react'

export default function MappedProducts(props){
    return(
        <div>
            <img className="mapped-products-image" src={props.productInfo.image}/>
            <p>{props.productInfo.product_name}</p>
            <p>{props.productInfo.price}</p>
        </div>
    )
}