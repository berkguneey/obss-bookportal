import React from 'react'
import { getAllRelation } from './api/RelationApi';
import Header from './components/Header';
import Footer from './components/Footer';

class Favourites extends React.Component {
    constructor(props){
        super(props)
        this.state = { relations:[] };
    }

    componentDidMount(){ 
        getAllRelation().then((data) => {
            this.setState({ relations:data });
            console.log(data);
        });
    }


    render() {
        return [
            <Header/>,
            <div class="container">
                <div class="row">
                    {
                        this.state.relations.map(function(item,i){
                            if(item.relation_type == 2) {
                            return (
                                <div class="col-md-4">
                                    <div style={{marginBottom:'15px',padding:'10px'}} class="card" >
                                        <img style={{maxHeight:'260px'}} class="card-img-top" src={item.book_src} />
                                        <div class="card-body">
                                            <h5 style={{fontWeight:'bold'}} class="card-title">{item.book_name}</h5>
                                           
                                        </div>
                                    </div>
                                </div>
                             )
                            }
                         })
                    }
                    
                </div>
            </div>,
            <Footer />
        ]
    }
}
export default Favourites;