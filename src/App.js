import React, { Component } from 'react';
// import '/reset.css'
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'
import './App.css';
import routes from './routes'
import Nav from './components/Nav'
import CartTotals from './components/CartTotals'



class App extends Component {

  render(props) {
    return (
      <div className="App">
        <Nav />
        {routes}
        {this.props.subTotal !== 0 ?<CartTotals />: ''}
      </div>
    );
  }
}

export default App
