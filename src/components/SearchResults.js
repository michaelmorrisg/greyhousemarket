import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ItemsCarousel from 'react-items-carousel'
import {range} from 'lodash'


class SearchResults extends Component {
    constructor(){
        super()
        this.state = {
            activeItemIndex: 0,
            searchResults: []
        }
    }
    
    // createChildren = n => range(n).map(i => <div key={i} style={{ height: 200, background: '#333' }}>{i}</div>);
    // componentDidMount(props){
    //     this.setState({
    //         searchResults : this.props.results
    //     })
    //     console.log(this.state.searchResults)
    //     setTimeout(() => {
    //         this.setState({
    //           searchResults: createChildren(20),
    //         })
    //       }, 100);
    // }
    // componentDidUpdate(prevProps){
    //     if(this.props.results !== prevProps.results){
    //         this.setState({
    //             searchResults : this.props.results
    //         })
    //         console.log(this.props.results)
    //     }
    // }

    
    
 
    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });


    render(props){
        const {activeItemIndex,searchResults} = this.state
        return(
            <div className={this.props.searchQuery ? "search-showing" : "search-hidden"}>
                {this.props.results.map((element,i)=>{
                    return <Link key={i} to={`/product/${element.products_id}`}>{element.product_name}</Link>
                })}

                {/* <ItemsCarousel
                        enablePlaceholder
                        numberOfPlaceholderItems={5}
                        minimumPlaceholderTime={1000}
                        placeholderItem={<div style={{ height: 200, background: '#900' }}>Placeholder</div>}
                 
                        // Carousel configurations
                        numberOfCards={3}
                        gutter={12}
                        showSlither={true}
                        firstAndLastGutter={true}
                        freeScrolling={false}
                 
                        // Active item configurations
                        requestToChangeActive={this.changeActiveItem}
                        activeItemIndex={activeItemIndex}
                        activePosition={'center'}
                 
                        chevronWidth={24}
                        rightChevron={'>'}
                        leftChevron={'<'}
                        outsideChevron={false}
                
                >
                {this.props.results[0] ? this.props.results.image : ''}
                </ItemsCarousel> */}

            </div>
        )
    }
}
export default SearchResults