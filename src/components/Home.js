import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Home extends Component{



    render(){
        return(
            <div>
                Home
                <Link to="/nails" >Nails</Link>
                <Link to="/walls">Walls</Link>
                <Link to="/kids">Kids</Link>
                <Link to="/car">Car</Link>
                <Link to="/seasonal">Seasonal</Link>
            </div>
        )
    }
}
export default Home