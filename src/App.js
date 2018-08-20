import React, { Component } from 'react';
// import './reset.css'
import './App.css';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'
import routes from './routes'
import Nav from './components/Nav'
import CartTotals from './components/CartTotals'
import SideDrawer from './components/SideDrawer'
import Backdrop from './components/Backdrop'




class App extends Component {
  constructor(){
    super()
    this.state = {
      sideDrawerOpen: false
    }
  }

  drawerToggleClickHandler = ()=>{
    this.setState((prevState)=>{
      return {sideDrawerOpen: !prevState.sideDrawerOpen}
    })
  }
  backdropClickHandler = ()=>{
    this.setState({
      sideDrawerOpen: false
    })
  }


  render(props) {
    let backdrop

    if(this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }
    return (
      <div className="App">
        <Nav drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer drawerClickHandler={this.drawerToggleClickHandler} show={this.state.sideDrawerOpen}/>
        {backdrop}
        {routes}
        {/* {this.props.subTotal !== 0 ?<CartTotals myId={this.props.id} />: ''} */}
      </div>
    );
  }
}

export default App
