import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './Home';
import Books from './Books';
import BooksAdd from './BooksAdd';
import BooksEdit from './BooksEdit';
import Favourites from './Favourites';
import WishLists from './WishLists';
import Authors from './Authors';
import AuthorsAdd from './AuthorsAdd';
import AuthorsEdit from './AuthorsEdit';
import Users from './Users';
import UsersAdd from './UsersAdd';
import UsersEdit from './UsersEdit';
import UserBooks from './UserBooks';

const AppRouter = () => (
    <Switch>
        <Route exact path="/" render={() => <Redirect replace to="home" />} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/books" component={UserBooks} />
        <Route exact path="/admin/books" component={Books} />
        <Route exact path="/admin/books/add" component={BooksAdd} />
        <Route exact path="/admin/books/edit/:id" component={BooksEdit} />
        <Route exact path="/admin/authors" component={Authors} />
        <Route exact path="/admin/authors/add" component={AuthorsAdd} />
        <Route exact path="/admin/authors/edit/:id" component={AuthorsEdit} />
        <Route exact path="/admin/users" component={Users} />
        <Route exact path="/admin/users/add" component={UsersAdd} />
        <Route exact path="/admin/users/edit/:id" component={UsersEdit} />
        <Route exact path="/favourites" component={Favourites} />
        <Route exact path="/wishlists" component={WishLists} />
    </Switch> 
)

export default AppRouter;