import React from 'react'
import { addAuthor } from './api/AuthorApi';
import { Redirect } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';


class AuthorsAdd extends React.Component {
    constructor(props){
        super(props)
        this.state = { author:{author_name:"", author_surname:""},message:"", success:false};
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
            addAuthor(this.state.author).then(data => {
                if(data.status){
                    that.setState({success:true});
                }
                else{
                    that.setState({success:false});
                }
            });
        }
    }

    render() {
        if(this.state.success) {
            return (<Redirect replace to="/admin/authors" />)
        }
        return [
            <Header />,
            <div class="container">
                <form style={{border:'1px solid #ccc', padding:'20px', borderRadius:'5px',marginBottom:'150px', Background:'#fff'}} method="post">
                    <div class="alert alert-danger" style={{display:(this.state.message=="")?'none':'block'}}>
                        {this.state.message}
                    </div>
                    <div class="form-group">
                        <label>Author Name: </label> 
                        <input type="text"  className="form-control" placeholder="Author Name" name="author_name" onChange={this.handleChange}/>
                    </div>
                    <div class="form-group">
                        <label>Author Surname: </label> 
                        <input type="text"  className="form-control" placeholder="Author Surname" name="author_surname" onChange={this.handleChange}/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleClick}>Kaydet</button>
                </form>
            </div>,
            <Footer />
        ]
    }
}
export default AuthorsAdd;