import React from 'react'

import Link from '../../node_modules/react-router-dom/Link';
class Header extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <header>
                <div className="container-fluid">
                    <div className="row"> 
                    <div className="header-top">
                        <nav className="navbar navbar-expand-sm">
                            <ul className="navbar-nav">
                                <li><Link style={{padding:"15px"}} class="nav-link" to={"/home"}>Home</Link></li>
                                <li><Link style={{padding:"15px"}} class="nav-link" to={"/admin/books"}>Books</Link></li>
                                <li><Link style={{padding:"15px"}} class="nav-link" to={"/admin/authors"}>Authors</Link></li>
                                <li><Link style={{padding:"15px"}} class="nav-link" to={"/admin/users"}>Users</Link></li>
                                <li><Link style={{padding:"15px"}} class="nav-link" to={"/favourites"}>My Favourites</Link></li>
                                <li><Link style={{padding:"15px"}} class="nav-link" to={"/wishlists"}>Wishlists</Link></li>
                                <li><Link style={{padding:"15px"}} class="nav-link" to={"/login"}>Login</Link></li>
                                <li><Link style={{padding:"15px"}} class="nav-link" to={"/logout"}>Logout</Link></li>
                            </ul>
                        </nav>
                    </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;