import React from 'react'

class Footer extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <footer className="py-3">
                <div className="container">
                <p className="m-0 text-center text-white">Copyright &copy; Your Website 2017</p>
                </div>
            </footer>
        )
    }
}
export default Footer;