import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from "./AppRouter"
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import Header from './components/Header';
import Footer from './components/Footer';

ReactDOM.render(
    <BrowserRouter>
    <AppRouter/> 
    </BrowserRouter>,
    document.getElementById("root")
)

//ReactDOM.render(<Footer />, document.getElementById('footer'));
//ReactDOM.render(<Header />, document.getElementById('header'));
//ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
