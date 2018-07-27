import React from 'react'
import { deleteBook, getAllBook, search } from './api/BookApi';
import { addRelationToFavourite, addRelationToWishList } from './api/RelationApi';
import Header from './components/Header';
import Footer from './components/Footer';
import Link from '../node_modules/react-router-dom/Link';

class Books extends React.Component {
    constructor(props){
        super(props)
        this.state = { books:[], userInput:'', searches:[] };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddToFavourite = this.handleAddToFavourite.bind(this);
        this.handleAddToWishList = this.handleAddToWishList.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount(){ 
        getAllBook().then((data) => {
            this.setState({ books:data });
            console.log(data);
        });
    }

    handleDelete(id) {
        deleteBook(id).then(data => {
            console.log("Silindi.");
            getAllBook().then((data) => {
                this.setState({ books:data });
                console.log(data);
            });
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

    render() {
        let that=this;
        return [
            <Header />,
            <div class="container">
                <form method="post" >
                    <div className="form-group">
                        <label>Search </label> 
                        <input type="text" className="form-control" onChange={this.handleChange} placeholder="Book Name or Author Name-Surname" name="bookname" required/>
                    </div>
                </form>

                <Link  style={{marginBottom:'15px'}} class="btn btn-primary btn-block" to={"/admin/books/add"}>Add Book</Link>
                <table style={{textAlign:'center',background:'#fff',marginBottom:'150px'}} className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Book Name</th>
                            <th scope="col">Author Name</th>
                            <th scope="col">Add Favourites</th>
                            <th scope="col">Add To List</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.books.map(function(item,i){
                                return (
                                    <tr>
                                        <td>{item.book_name}</td>
                                        <td>{item.author_name} {item.author_surname}</td>
                                        <td><button id={item.book_id} onClick={() => that.handleAddToFavourite(item.book_id)} className="btn btn-primary">Add</button></td>
                                        <td><button id={item.book_id} onClick={() => that.handleAddToWishList(item.book_id)} className="btn btn-primary">Add</button></td>
                                        <td><button id={item.book_id} onClick={() => that.handleDelete(item.book_id)} className="btn btn-danger">Delete</button></td>
                                        <td><Link to={"/admin/books/edit/"+item.book_id} className="btn btn-warning">Update</Link></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
		        </table>
            </div>,
            <Footer />
        ]
    }
}
export default Books;