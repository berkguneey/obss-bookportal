import React from 'react'
import { deleteBook, getAllBook, search } from './api/BookApi';
import { addRelationToFavourite, addRelationToWishList } from './api/RelationApi';
import Header from './components/Header';
import Footer from './components/Footer';
import Link from '../node_modules/react-router-dom/Link';

class UserBooks extends React.Component {
    constructor(props){
        super(props)
        this.state = { books:[], userInput:'', searches:[] };
        this.handleAddToFavourite = this.handleAddToFavourite.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount(){ 
        getAllBook().then((data) => {
            this.setState({ books:data });
            console.log(data);
        });
    }

    handleAddToFavourite(id) {
        addRelationToFavourite(id).then(data => {
            console.log("ok");
        });
    }

    handleAddToWishList(id) {
        addRelationToWishList(id).then(data => {
            console.log("ok");
        });
    }

    handleChange(event) {
        this.setState({userInput:event.target.value})
        console.log(this.state.userInput);
        if(event.target.value != ''){
            search(event.target.value,100).then((data) => {
                if(!data || data.hasOwnProperty('error')){
                    this.setState({books:[]});
                } else {
                    this.setState({books:data});
                }
            });
        } else {
            getAllBook().then((data) => {
                this.setState({ books:data });
                console.log(data);
            });
        }
        
    }

    handleClick(e) {
        e.preventDefault();
        search(this.state.userInput,100).then((data) => {
            if(!data || data.hasOwnProperty('error')){
                this.setState({books:[]});
            } else {
                this.setState({books:data});
            }
        });
    }

    handleAddToFavourite(id) {
        addRelationToFavourite(id).then(data => {
            console.log("ok");
        });
    }

    handleAddToWishList(id) {
        addRelationToWishList(id).then(data => {
            console.log("ok");
        });
    }

    render() {
        let that=this;
        return [
            <Header />,
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <form method="post" >
                            <div className="form-group">
                                <label>Search </label> 
                                <input type="text" className="form-control" onChange={this.handleChange} placeholder="Book Name or Author Name-Surname" name="bookname" required/>
                            </div>
                        </form>
                    </div>
                    {
                        this.state.books.map(function(item,i){
                            return (
                                <div class="col-md-4">
                                    <div style={{marginBottom:'15px',padding:'10px'}} class="card" >
                                        <img style={{maxHeight:'460px'}} class="card-img-top" src={item.book_src} />
                                        <div class="card-body">
                                            <h5 style={{fontWeight:'bold'}} class="card-title">{item.book_name}</h5>
                                            <p class="card-text">{item.author_name} {item.author_surname} - {item.book_added_date}</p>
                                            <button style={{float:'left'}} id={item.book_id} onClick={() => that.handleAddToFavourite(item.book_id)} className="btn btn-success col-md-5">Add Favourite</button>
                                            <button style={{float:'right'}} id={item.book_id} onClick={() => that.handleAddToWishList(item.book_id)} className="btn btn-info col-md-5">Add WishList</button>
                                        </div>
                                    </div>
                                </div>
                             )
                         })
                    }
                    
                </div>
            </div>,
            <Footer />
        ]
    }
}
export default UserBooks;