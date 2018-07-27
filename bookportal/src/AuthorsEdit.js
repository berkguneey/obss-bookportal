import React from 'react'
import { getAllAuthor, updateAuthor, getAuthor } from './api/AuthorApi';
import { getBook } from './api/BookApi';
import { Redirect } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';


class AuthorsEdit extends React.Component {
    constructor(props){
        super(props)
        this.state = { message:"", author:{}, success:false };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        var newAuthor = this.state.author;
        newAuthor[event.target.name]=event.target.value;
        this.setState({author:newAuthor})
        console.log(this.state);
    }
    handleClick(){
        this.setState({message:""});
        let that = this;
        var check = true;
        if(that.state.author["author_name"] == undefined || that.state.author["author_name"] ==""){
            that.setState({message:"Please Fill Author Name Input"});
            check = false;
        }
        if(that.state.author["author_surname"] == undefined || that.state.author["author_surname"] ==""){
            that.setState({message:"Please Fill Author Surname Input"});
            check = false;
        }
        if(check){
            updateAuthor(this.props.match.params.id, this.state.author).then(data => {
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
        getAuthor(this.props.match.params.id).then((data) => {
            if(data.status){
                this.setState({ author:data.author });
            }else{
                this.setState({success:true});
            }
            console.log(data);
        });
    }

    render() {
        if(this.state.success) {
            return (<Redirect replace to="/admin/authors" />)
        }
        return [
            <Header />,
            <div class="container">
                <form style={{border:'1px solid #ccc', padding:'20px', borderRadius:'5px',marginBottom:'150px', Background:'#fff'}}>
                    <div class="form-group">
                        <label>Author Name: </label> 
                        <input type="text" name="author_name" value={this.state.author.author_name}  onChange={this.handleChange} class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label>Author Surname: </label> 
                        <input type="text" name="author_surname" value={this.state.author.author_surname}  onChange={this.handleChange} class="form-control"/>
                    </div>
                    <button type="button" class="btn btn-primary" onClick={this.handleClick}>Kaydet</button>
                </form>
            </div>,
            <Footer />
        ]
    }
}
export default AuthorsEdit;