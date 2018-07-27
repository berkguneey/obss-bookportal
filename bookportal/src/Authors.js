import React from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import Link from '../node_modules/react-router-dom/Link';
import { getAllAuthor, deleteAuthor } from './api/AuthorApi';

class Authors extends React.Component {
    constructor(props){
        super(props)
        this.state = { authors:[] };
        /*
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddToFavourite = this.handleAddToFavourite.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        */
    }

    componentDidMount(){ 
        getAllAuthor().then((data) => {
            this.setState({ authors:data });
            console.log(data);
        });
    }

    handleDelete(id) {
        deleteAuthor(id).then(data => {
            console.log("Silindi.");
            getAllAuthor().then((data) => {
                this.setState({ authors:data });
                console.log(data);
            });
        });
    }

    render() {
        let that=this;
        return [
            <Header />,
            <div class="container">
                <Link  style={{marginBottom:'15px'}} class="btn btn-primary btn-block" to={"/admin/authors/add"}>Add Author</Link>
                <table style={{textAlign:'center',background:'#fff',marginBottom:'150px'}} className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Author Name</th>
                            <th scope="col">Author Surname</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.authors.map(function(item,i){
                                return (
                                    <tr>
                                        <td>{item.author_name}</td>
                                        <td>{item.author_surname}</td>
                                        <td><button id={item.author_id} onClick={() => that.handleDelete(item.author_id)} className="btn btn-danger">Delete</button></td>
                                        <td><Link to={"/admin/authors/edit/"+item.author_id} className="btn btn-warning">Update</Link></td>
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
export default Authors;