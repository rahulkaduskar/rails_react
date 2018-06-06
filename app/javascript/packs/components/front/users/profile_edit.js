import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { profile, update } from '../../../actions/users.js';
import UserDelete from './delete_account';

class UserProfileEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {  
        user: this.props.user,
        userLoaded: true,
        isEdit:  true,
        errors: {},
        success:  false,
        error: false
    };
  }

  handleChange(event){
    const user = this.state.user;
    user[event.target.id] = event.target.value;
    this.setState({ user: user });
  }

  handleSubmit(event) {

    if(this.validateForm()){
      this.props.update({user: this.state.user})
        .then(response => {
          this.setState({success: true});
        })
        .catch(error => {
            var error_message = error.response.data.errors.full_messages;
             this.setState({error: true, error_message: error_message});
        });
    }
    event.preventDefault();
  }

  validateForm() {
    let fields = this.state.user;
    let errors = {};
    //Name
    if(!fields['name']){
      errors['name'] = 'Cannot be empty';
    }

    //Email
    if(!fields['email']){
      errors['email'] = 'Email cannot be empty';
    }

    if(typeof fields['email'] !== 'undefined'){ 
      let regex = /\S+@\S+\.\S+/;

      if (!regex.test(fields['email'])) {
        errors['email'] = 'Email is not valid';
      }
    }
    if(typeof fields['password'] != 'undefined'){
      if(!fields['password'] && fields['password'].length > 8){
        errors['password'] = 'Password length should be at least 8 characters.';
      }
    }
    if(fields['password'] && fields['password'] != fields['password_confirmation']){
      errors['password_confirmation'] = 'Password does not match';
    }

    this.setState({errors: errors});
    return !Object.keys(errors).length;
  }

  updatePage(event){
    this.setState({success: false});
    this.props.history.go('/user/profile');
  }

  movePage(event){
    this.props.history.go('/user/profile');
    event.preventDefault();
  }

  render() {
    const { isAuthenticated } = this.props;
    const userLoaded = this.state.userLoaded;
    const user = this.state.user;
    if (!isAuthenticated) {
      return <Redirect to="/user/login" />;
    }else if (!userLoaded) {
      return ( <div></div>);
    }else{
      return (
        <div>
            <div className='Login'>
                <h3> Update Profile </h3>
                <Form onSubmit={(evt) => this.handleSubmit(evt)}>
                    <FormGroup className="form-group col-lg-12  p-0 text" >
                        <Label className="col-lg-2 text-right float-xl-left mr-2 p-0">Name:</Label>
                        <Input
                          autoFocus
                          id='name'
                          className="col-lg-9"
                          type='text'
                          value={user.name || ''}
                          onChange={(evt) => this.handleChange(evt)}
                        />
                        <span style={{color: 'red'}}>{this.state.errors['name']}</span>
                    </FormGroup>
                    <FormGroup className="form-group col-lg-12  p-0 text" >
                        <Label className="col-lg-2 text-right float-xl-left mr-2 p-0">Email</Label>
                        <Input
                          autoFocus
                          id='email'
                          className="col-lg-9"
                          type='text'
                          value={user.email || ''}
                          onChange={(evt) => this.handleChange(evt)}
                        />
                        <span style={{color: 'red'}}>{this.state.errors['email']}</span>
                    </FormGroup>
                    <FormGroup className="form-group col-lg-12  p-0 text" >
                        <Label className="col-lg-2 text-right float-xl-left mr-2 p-0">Password</Label>
                        <Input
                          id='password'
                          className="col-lg-9"
                          onChange={(evt) => this.handleChange(evt)}
                          type='password'
                        />
                        <span style={{color: 'red'}}>{this.state.errors['password']}</span>
                    </FormGroup>
                    <FormGroup className="form-group col-lg-12  p-0 text" >
                        <Label className="col-lg-2 text-right float-xl-left mr-2 p-0">Confirm Password</Label>
                        <Input
                          id='password_confirmation'
                          className="col-lg-9"
                          onChange={(evt) => this.handleChange(evt)}
                          type='password'
                        />
                        <span style={{color: 'red'}}>{this.state.errors['password_confirmation']}</span>
                    </FormGroup>
                    <Button className='mt-3 float-lg-right' type='submit'>
                      Update
                    </Button> 
                    <Button className='mt-3 mr-2 float-lg-right' onClick={(evt) => this.movePage(evt)}>
                      Cancel
                    </Button> 
                    <div className="clearfix"></div>
                    <SweetAlert
                        success
                        show={this.state.success}
                        title="Success"
                        confirmBtnBsStyle="success"
                        onConfirm={(evt) => this.updatePage(evt)}
                    >
                        Profile update successfully
                    </SweetAlert>

                    <SweetAlert
                        danger
                        show={this.state.error}
                        confirmBtnBsStyle="danger"
                        title="Error"
                        onConfirm={() => this.setState({error: false})}
                    >
                      {this.state.error_message}
                    </SweetAlert>
                </Form>
            </div>
            <div className="clearfix"></div>
            <div>
                <UserDelete></UserDelete>
            </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated } = auth;
  return { isAuthenticated };
}

export default connect(mapStateToProps, { update })(UserProfileEdit);
