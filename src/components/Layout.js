import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Loader from './Loader'
function Layout(props) { //will receive pages content via props
    return (

        <div>
            {props.loading && (<Loader/>)}  {/*if loading ==true then display Loader*/}
            <Header />
            <div className='content'>
                {props.children}
            </div>
            {/*<Footer/>*/}
        </div>

    )
}

export default Layout
