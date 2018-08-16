import React, {Component} from 'react'
import ItemsCarousel from 'react-items-carousel'
import {range} from 'lodash'

class ItemCarousel extends Component {
    constructor(){
        super()
        this.state = {
           activeItemIndex: 0,
            pictures : [<img src='https://i.ytimg.com/vi/GruPNmCb-fQ/maxresdefault.jpg'/>,<img src='https://media.mnn.com/assets/images/2013/10/Corgeek.jpg'/>]
        }
    }
    createChildren = n => range(n).map(i => <div key={i} style={{ height: 200, background: '#333' }}>{i}</div>);
 
    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

    render(){
        const {
            activeItemIndex,
            pictures,
          } = this.state;
        return (
            <div>
                      <ItemsCarousel
        // Placeholder configurations
        enablePlaceholder
        numberOfPlaceholderItems={5}
        minimumPlaceholderTime={1000}
        placeholderItem={<div style={{ height: 200, background: '#900' }}>Placeholder</div>}
 
        // Carousel configurations
        numberOfCards={2}
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
        {pictures}
      </ItemsCarousel>
            </div>
        )
    }
}
export default ItemCarousel