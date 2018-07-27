import React from 'react'
import { addBook } from './api/BookApi';
import { getAllAuthor } from './api/AuthorApi';
import { Redirect } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { addUser } from './api/UserApi';


class UsersAdd extends React.Component {
    constructor(props){
        super(props)
        this.state = { user:{user_name:"",user_surname:"",user_email:"",user_role:"",user_password:""},message:"", success:false};
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        var newUser = this.state.user;
        newUser[event.target.name]=event.target.value;
        this.setState({user:newUser})
        console.log(this.state);
    }
    handleClick(){
        this.setState({message:""});
        let that = this;
        var check = true;
        if(that.state.user["user_name"] == undefined || that.state.user["user_name"] ==""){
            that.setState({message:"Please Fill User Name Input"});
            check = false;
        }
        if(that.state.user["user_surname"] == undefined || that.state.user["user_surname"] ==""){
            that.setState({message:"Please Fill User Surname Input"});
            check = false;
        }
        if(that.state.user["user_email"] == undefined || that.state.user["user_email"] ==""){
            that.setState({message:"Please Fill User Email Input"});
            check = false;
        }
        if(that.state.user["user_password"] == undefined || that.state.user["user_password"] ==""){
            that.setState({message:"Please Fill User Password Input"});
            check = false;
        }
        if(that.state.user["user_role"] == undefined || that.state.user["user_role"] =="" || that.state.user["user_role"] ==0){
            that.setState({message:"Please Select User Role"});
            check = false;
        }
        if(check){
            addUser(this.state.user).then(data => {
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
            return (<Redirect replace to="/admin/users" />)
        }
        return [
            <Header />,
            <div class="container">
                <form style={{border:'1px solid #ccc', padding:'20px', borderRadius:'5px',marginBottom:'150px', Background:'#fff'}} method="post">
                    <div class="alert alert-danger" style={{display:(this.state.message=="")?'none':'block'}}>
                        {this.state.message}
                    </div>
                    <div class="form-group">
                        <label>User Name: </label> 
                        <input type="text"  className="form-control" placeholder="User Name" name="user_name" onChange={this.handleChange}/>
                    </div>
                    <div class="form-group">
                        <label>User Surname: </label> 
                        <input type="text"  className="form-control" placeholder="User Surname" name="user_surname" onChange={this.handleChange}/>
                    </div>
                    <div class="form-group">
                        <label>User Email: </label> 
                        <input type="text"  className="form-control" placeholder="User Email" name="user_email" onChange={this.handleChange}/>
                    </div>
                    <div class="form-group">
                        <label>User Password: </label> 
                        <input type="text"  className="form-control" placeholder="User Password" name="user_password" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>User Role: </label> 
                        <select className="form-control" name="user_role" onChange={this.handleChange}>
                            <option value="0">Select Role</option>
                            <option value="ROLE_USER">ROLE_USER</option>
				            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                        </select>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleClick}>Kaydet</button>
                </form>
            </div>,
            <Footer />
        ]
    }
}
export default UsersAdd;