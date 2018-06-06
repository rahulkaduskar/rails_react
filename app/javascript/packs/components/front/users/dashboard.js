import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import UserLogin from './login.js';
import { auth } from '../../../actions/auth.js'

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
        return (<Redirect to="/user/login" />);
    }else {
      return (
        <div className="h-100">
          <h3> Welcome to My App </h3>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  const { loading, isAuthenticated } = auth;
  return {
    loading,
    isAuthenticated
  };
}

export default connect(mapStateToProps, { })(Dashboard);