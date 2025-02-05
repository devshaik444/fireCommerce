import React from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaCartPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function Header() {

    const {cartItems}=useSelector(state=>state.cartReducer)
    
    const {user}=JSON.parse(localStorage.getItem('currentUser')) //{user}=its called destructuring 

    const logout=()=>{
        localStorage.removeItem('currentUser');
        window.location.reload()
    }

    return (
        <div className='header'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">FireCommerce
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"><FaBars size={26} color='white'/></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto" >
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">{user.email.substring(0,user.email.length-10)}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/orders">Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={logout}>Logout</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart"><FaCartPlus/> {cartItems.length}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header

//The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, 
//or properties from objects, into distinct variables
