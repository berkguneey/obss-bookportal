import React from 'react'
import { addBook } from './api/BookApi';
import { getAllAuthor } from './api/AuthorApi';
import { Redirect } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';


class BooksAdd extends React.Component {
    constructor(props){
        super(props)
        this.state = { book:{book_src:"",author_id:0,book_name:""},message:"", authors:[], success:false};
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        var newBook = this.state.book;
        newBook[event.target.name]=event.target.value;
        this.setState({book:newBook})
        console.log(this.state);
    }
    handleClick(){
        this.setState({message:""});
        let that = this;
        var check = true;
        if(that.state.book["author_id"] == undefined || that.state.book["author_id"] ==0){
            that.setState({message:"Please Select Author"});
            check = false;
        }
        if(that.state.book["book_src"] == undefined || that.state.book["book_src"] ==""){
            that.setState({message:"Please Fill Book Src Input"});
            check = false;
        }
        if(that.state.book["book_name"] == undefined || that.state.book["book_name"] ==""){
            that.setState({message:"Please Fill Book Name Input"});
            check = false;
        }
        if(check){
            addBook(this.state.book).then(data => {
                if(data.status){
                    that.setState({success:true});
                }
                else{
                    that.setState({success:false});
                }
            });
        }
    }
    componentDidMount(){
        getAllAuthor().then((data) => {
            this.setState({ authors:data });
        });
    }

    render() {
        if(this.state.success) {
            return (<Redirect replace to="/admin/books" />)
        }
        return [
            <Header />,
            <div style={{marginBottom:'150px'}} class="container">
                <form style={{border:'1px solid #ccc', padding:'20px', borderRadius:'5px',marginBottom:'150px', Background:'#fff'}} method="post">
                    <div className="alert alert-danger" style={{display:(this.state.message=="")?'none':'block'}}>
                        {this.state.message}
                    </div>
                    <div class="form-group">
                        <label>Book Name: </label> 
                        <input type="text"  className="form-control" placeholder="Book Name" name="book_name" onChange={this.handleChange}/>
                    </div>
                    <div class="form-group">
                        <label>Img Url: </label> 
                        <input type="text" className="form-control" placeholder="Image Url" name="book_src" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Author: </label> 
                        <select className="form-control" name="author_id" onChange={this.handleChange}>
                                    <option value="0">Select an Author</option>
                        {
                            this.state.authors.map(function(item,i){
                                return (
                                    <option value={item.author_id}>{item.author_name} {item.author_surname}</option>
                                )
                            })
                        }
                        </select>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleClick}>Save</button>
                </form>
            </div>,
            <Footer />
        ]
    }
}
export default BooksAdd;