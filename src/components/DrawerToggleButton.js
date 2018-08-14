import React from 'react'

const DrawerToggleButton = props => {
    return (
        <button className="hamburger-button" onClick={()=>props.click()}><img className="normal" src={require('../images/Hamburger.png')}/></button>
    )
}
export default DrawerToggleButton