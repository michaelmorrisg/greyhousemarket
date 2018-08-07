import React, { Component } from 'react';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'
import './App.css';
import routes from './routes'
import Nav from './components/Nav'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        {routes}
      </div>
    );
  }
}

export default App;
