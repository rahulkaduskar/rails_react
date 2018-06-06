import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../actions/auth.js';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleSignout = this.handleSignout.bind(this);
  }

  getLinks(){
    if(!this.props.isAuthenticated){
      return [ { key: 1, text: 'Login', url: '/user/login'}, 
               { key: 2, text: 'Register', url: '/user/signup'} ];
    }else{
      return [ { key: 1, text: 'profile setting', url: '/user/profile'}];
    }
  }

  handleSignout() {
    this.props.signout();
  }

  render() {
    const { isAuthenticated } = this.props;
    const navBarLinks = this.getLinks();
    return (
        <nav className="navbar navbar-expand navbar-dark bg-primary navbar-fixed-top navbar-full">
            <Link className="navbar-brand navbar-brand-1 float-xs-left" to={'/'}>My Site</Link>
            <div className="collapse navbar-collapse float-xs-right">
                <ul className="navbar-nav ml-auto">
                  {
                    navBarLinks.map(function(link){
                    return <li key={link.key} className="nav-item mr-5">
                            <Link className="nav-link" to={link.url}>
                              {link.text} 
                            </Link> 
                           </li>;
                    })
                  }
                  { isAuthenticated ?
                    (<li key='signout' className="nav-item mr-5">
                      <Link className="nav-link" to="#" onClick={this.handleSignout}>
                        Logout
                      </Link> 
                    </li>) : ('')
                  }
                </ul>
            </div>
        </nav>

    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated } = auth;
  return { isAuthenticated };
}

export default connect(mapStateToProps, {signout})(Navbar);