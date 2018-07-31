import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { profile, update } from '../../../actions/users.js';
import UserDelete from './delete_account';
import UserProfileEdit from './profile_edit';

class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.getInitialState = this.getInitialState.bind(this);
    this.state = this.getInitialState();
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  getInitialState() {
    return   {  
      user: {},
      userLoaded: false,
      isEdit:  false,
      errors: {},
      success:  false,
      error: false
    };
  }

  componentDidMount() {
    this.props
        .profile()
        .then(response => {
            this.setState({
                user: response.data.user,
                userLoaded: true
            });
        });
  }

 
  handleChange(event) {
    let fields = this.state.user;
    fields[event.target.id] = event.target.value;
  }

  cancelEdit(){
    this.setState({isEdit: false});
  }


  render() {
    const { isAuthenticated } = this.props;
    const userLoaded = this.state.userLoaded;
    const user = this.state.user;
    if (!isAuthenticated ) {
      return <Redirect to="/user/login" />;
    }else if (!userLoaded) {
      return (
        <div></div>
        );
    }else if(this.state.isEdit){
      return (
          <UserProfileEdit history={ this.props.history} cancelEdit = {this.cancelEdit} user={this.state.user}></UserProfileEdit>
      );
    }else{
      return (
        <div className='d-flex col-12'>
            <div className='Login'>
                <h3> Profile </h3>
                <Form onSubmit={(evt) => this.handleSubmit(evt)}>

                    <Button  color="link" className='float-right' onClick={() => this.setState({isEdit: true})}>
                      Edit
                    </Button> 
                    <FormGroup className="form-group col-lg-12  p-0 text">
                        <Label className="col-lg-2 text-right float-xl-left mr-2 p-0">Name</Label>
                        <div className="col-lg-9"> {user.name}</div>
                    </FormGroup>
                    <FormGroup className="form-group col-lg-12  p-0 text">
                        <Label className="col-lg-2 text-right float-xl-left mr-2 p-0">Email</Label>
                        <div className="col-lg-9"> {user.email}</div>
                    </FormGroup>
                   
                    <SweetAlert
                        success
                        show={this.state.success}
                        title="Success"
                        confirmBtnBsStyle="success"
                        onConfirm={() => this.setState({isEdit: false})}>

                        Welcome! You have signed up successfully
                    </SweetAlert>
                </Form>
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

export default connect(mapStateToProps, { profile })(UserProfile);
