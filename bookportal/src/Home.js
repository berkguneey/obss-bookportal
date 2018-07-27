import React from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import Link from '../node_modules/react-router-dom/Link';

class Home extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return [
            <Header />,
            <div class="container">
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title">OBSS - Book Portal</h5>
                        <p class="card-text">Berk Güney - OBSS Java Summer School</p>
                        <div class="row">
                            <div class="col-md-4">
                                <Link  style={{marginBottom:'15px'}} class="btn btn-primary btn-block " to={"/books"}>List Books</Link>
                            </div>
                            <div class="col-md-4">
                                <Link  style={{marginBottom:'15px'}} class="btn btn-primary btn-block " to={"/favourites"}>List Your Favourites</Link>
                            </div>
                            <div class="col-md-4">
                                <Link  style={{marginBottom:'15px'}} class="btn btn-primary btn-block " to={"/wishlists"}>List Your Wish-List</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>,
            <Footer />
        ]
    }
}
export default Home;