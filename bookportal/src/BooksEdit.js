import React from 'react'
import { getAllAuthor } from './api/AuthorApi';
import { getBook, updateBook } from './api/BookApi';
import { Redirect } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';


class BooksEdit extends React.Component {
    constructor(props){
        super(props)
        this.state = { message:"", book:{}, authors:[], success:false };
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
        if(that.state.book["book_name"] == undefined || that.state.book["book_name"] ==""){
            that.setState({message:"Please Fill Book Name Input"});
            check = false;
        }
        if(check){
            updateBook(this.props.match.params.id, this.state.book).then(data => {
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
            console.log(data);
        });
        getBook(this.props.match.params.id).then((data) => {
            if(data.status){
                this.setState({ book:data.book });
            }else{
                this.setState({success:true});
            }
            
            console.log(data);
        });
    }

    render() {
        if(this.state.success) {
            return (<Redirect replace to="/admin/books" />)
        }
        return [
            <Header />,
            <div class="container">
                <form style={{border:'1px solid #ccc', padding:'20px', borderRadius:'5px',marginBottom:'150px', Background:'#fff'}}>
                    <div class="form-group">
                        <label>Book Name: </label> 
                        <input type="text" name="book_name" value={this.state.book.book_name}  onChange={this.handleChange} class="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Img Url: </label> 
                        <input type="text" className="form-control" value={this.state.book.book_src} placeholder="Image Url" name="book_src" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Author: </label> 
                        <select className="form-control" value={this.state.book.author_id} name="author_id" onChange={this.handleChange}>
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
                    <button type="button" class="btn btn-primary" onClick={this.handleClick}>Kaydet</button>
                </form>
            </div>,
            <Footer />
        ]
    }
}
export default BooksEdit;