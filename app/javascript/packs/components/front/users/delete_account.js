import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, Label } from "reactstrap";
import { deleteAccount } from '../../../actions/users.js';  
import SweetAlert from 'react-bootstrap-sweetalert';

class UserDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDeleteWarning: false,
      error: false,
      error_message: 'Account once deleted will not be recover again.\
                      Are you sure you want to delete account'
    };
  }

  deleteAccount(){
    this.props.deleteAccount()
        .then(response => {
          this.setState({showDeleteWarning: false});
          this.props.history("/");
        })
        .catch(error => {
            var error_message = error.response.data.errors.full_messages;
             this.setState({error: true, error_message: error_message});
        });
  }

  hideAlert(){
    this.setState({showDeleteWarning: false});
  }

  render() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return <Redirect to="/" />;
    }else{
      return (
        <div className="Login mt-3">
            <div>
                <div className="p-2 text-center font-weight-bold"> Deleting account will delete all personal data. </div>
                <Button block className='mt-0 btn btn-danger border-0 float-lg-right' onClick={() => this.setState({showDeleteWarning: true})}>
                    Delete
                </Button> 
                <div className="clearfix"></div>
                <SweetAlert
                    danger
                    show={this.state.showDeleteWarning}
                    showCancel
                    confirmBtnBsStyle="danger"
                    title="Confirm"
                    onCancel={() => this.hideAlert()}
                    onConfirm={() => this.deleteAccount()} 
                >
                {this.state.error_message}
                </SweetAlert>
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

export default connect(mapStateToProps, { deleteAccount })(UserDelete);