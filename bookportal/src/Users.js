import React from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import Link from '../node_modules/react-router-dom/Link';
import { getAllUser, deleteUser, search } from './api/UserApi';

class Users extends React.Component {
    constructor(props){
        super(props)
        this.state = { users:[], userInput:'' };
        
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    componentDidMount(){ 
        getAllUser().then((data) => {
            this.setState({ users:data });
            console.log(data);
        });
    }

    handleDelete(id) {
        deleteUser(id).then(data => {
            console.log("Silindi.");
            getAllUser().then((data) => {
                this.setState({ users:data });
                console.log(data);
            });
        });
    }

    handleChange(event) {
        this.setState({userInput:event.target.value})
        console.log(this.state.userInput);
        if(event.target.value != ''){
            search(event.target.value,100).then((data) => {
                if(!data || data.hasOwnProperty('error')){
                    this.setState({users:[]});
                } else {
                    this.setState({users:data});
                }
            });
        } else {
            getAllUser().then((data) => {
                this.setState({ users:data });
                console.log(data);
            });
        }
        
    }

    handleClick(e) {
        e.preventDefault();
        search(this.state.userInput,100).then((data) => {
            if(!data || data.hasOwnProperty('error')){
                this.setState({users:[]});
            } else {
                this.setState({users:data});
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
                        <input type="text" className="form-control" onChange={this.handleChange} placeholder="User Name or User Surname" name="username" required/>
                    </div>
                </form>
                <Link  style={{marginBottom:'15px'}} class="btn btn-primary btn-block" to={"/admin/users/add"}>Add User</Link>
                <table style={{textAlign:'center',background:'#fff',marginBottom:'150px'}} className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">User Name</th>
                            <th scope="col">User Surname</th>
                            <th scope="col">User Email</th>
                            <th scope="col">User Role</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(function(item,i){
                                return (
                                    <tr>
                                        <td>{item.user_name}</td>
                                        <td>{item.user_surname}</td>
                                        <td>{item.user_email}</td>
                                        <td>{item.user_role}</td>
                                        <td><button id={item.author_id} onClick={() => that.handleDelete(item.user_id)} className="btn btn-danger">Delete</button></td>
                                        <td><Link to={"/admin/users/edit/"+item.user_id} className="btn btn-warning">Update</Link></td>
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
export default Users;