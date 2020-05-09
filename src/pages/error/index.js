import React from 'react';
import './error.sass';
import { Link } from 'react-router-dom';

class Error extends React.Component {
    render() {
        return (
            <div className="error-container">
                <div className="center">
                    <h1>404: Page not found</h1>
                    <Link to='/'><button className="home">Homepage</button></Link>
                </div>
            </div>
        )
    }
}

export default Error;