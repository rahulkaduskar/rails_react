import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, FormGroup, FormControl, Input, FormText, Label } from "reactstrap";
import { login } from '../../../actions/auth.js'

class UserLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit() {
    const { email, password } = this.state;
    this.props.login(email, password);
    return false;
  }

  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }else{
      return (
        <div className="Login">
          <h3> Login in </h3>
          <form onSubmit={(evt) => this.handleSubmit(evt)} action="javascript:void(0)">
            <FormGroup >
              <Label>Email</Label>
              <Input
                autoFocus
                id="email"
                type="email"
                value={this.state.email}
                onChange={(evt) => this.handleChange(evt)}
              />
            </FormGroup>
            <FormGroup >
              <Label>Password</Label>
              <Input
                id="password"
                value={this.state.password}
                onChange={(evt) => this.handleChange(evt)}
                type="password"
              />
            </FormGroup>
            <Button
              block
              disabled={!this.validateForm()}
              type="submit"
            >
              Login
            </Button>
          </form>
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

export default connect(mapStateToProps, { login })(UserLogin);