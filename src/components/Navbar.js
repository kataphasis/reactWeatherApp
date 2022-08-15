import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthProvider'


const Navbar = () => {
const [click, setClick] = useState(false)
const handleClick = () => setClick(!click)
const {login} = useContext(AuthContext)
    return (
        <div className='header'>
            <div className='container'>
                <h1>Patrick's<span className='primary'>Crypto Site</span></h1>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <span onClick={login}>Login</span>
                    </li>
                </ul>
                
            </div>
        </div>
    )
}

export default Navbar