import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ItemsCarousel from 'react-items-carousel'
import {range} from 'lodash'




class SearchResults extends Component {
    constructor(){
        super()
        this.state = {
            activeItemIndex: 0,
            children: [],
            carousel: false,
        }
    }
    componentDidMount() {
        this.setState({
          children: this.props.results,
          activeItemIndex: 0
        });
        // console.log(this.state.children)
    }
    async componentDidUpdate(prevProps){
        if(this.props.results !== prevProps.results){
            await this.setState({
                children: this.props.results.map(element=>{
                    return element.image
                })
            })
        }
    }

    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });
                



    render(props){
        const {
            activeItemIndex,
            children,
          } = this.state;
        return(
            <div className={this.props.searchQuery ? "search-showing" : "search-hidden"}>
                {/* {this.props.results.map((element,i)=>{
                    return <Link key={i} to={`/product/${element.products_id}`}>{element.product_name}</Link>
                })} */}
            <ItemsCarousel
        // Placeholder configurations
        enablePlaceholder={false}
        numberOfPlaceholderItems={this.props.results.length}
        minimumPlaceholderTime={1000}
        placeholderItem={<div style={{ height: 100, background: '#707070' }}></div>}
 
        // Carousel configurations
        numberOfCards={2}
        gutter={13}
        showSlither={true}
        firstAndLastGutter={true}
        freeScrolling={false}
        slidesToScroll={2}
 
        // Active item configurations
        requestToChangeActive={this.changeActiveItem}
        activeItemIndex={activeItemIndex}
        activePosition={'center'}
 
        chevronWidth={30}
        rightChevron={'>'}
        leftChevron={'<'}
        outsideChevron={false}
        children={this.props.results.map((element,i)=>{
            let splitImages = element.image.split(' ')
            return <div className="carousel-search-div"><Link className='carousel-search-text' to={`/product/${element.products_id}`}><div className="search-upper-div" style={{backgroundImage: `url(${splitImages[0]})`,backgroundPosition: 'center',backgroundSize: 'cover'}}></div><div className="search-lower-div"><p>{element.product_name}</p></div></Link></div>
        })}
      />
            </div>
        )
    }
}
export default SearchResults