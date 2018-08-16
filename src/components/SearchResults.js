import React, {Component} from 'react'
import {Link} from 'react-router-dom'


class SearchResults extends Component {


    render(props){
        return(
            <div className={this.props.searchQuery ? "search-showing" : "search-hidden"}>
                {this.props.results.map((element,i)=>{
                    return <Link to={`/product/${element.products_id}`}>{element.product_name}</Link>
                })}
            </div>
        )
    }
}
export default SearchResults