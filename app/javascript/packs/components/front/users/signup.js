import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { loadConsents } from '../../../actions/consents.js';
import { sign_up} from '../../../actions/users.js';


class UserSignup extends Component {

  constructor(props) {
    super(props);
    this.getInitialState = this.getInitialState.bind(this);

    this.state = this.getInitialState();

  }

  getInitialState() {
    return   {  fields: {},
      consents: [],
      errors: {},
      success:  false,
      error: false};
  }

  componentDidMount() {
    this.props
        .loadConsents()
        .then(response => {
          this.setState({
            consents: response.data.consents // Sets the state
          });
        });
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    //Name
    if(!fields['name']){
      errors['name'] = 'Cannot be empty';
    }

    if(typeof fields['name'] !== 'undefined'){
      if(!fields['name'].match(/^[a-zA-Z]+$/)){
        errors['name'] = 'Only letters';
      }          
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
    if(typeof fields['password'] !== 'undefined'){
      if(!fields['password'] && fields['password'].length > 8){
        errors['password'] = 'Password length should be at least 8 characters.';
      }
    }
    if(fields['password'] && fields['password'] != fields['password_confirmation']){
      errors['password_confirmation'] = 'Password does not match';
    }

    if(this.state.consents.length){
      this.state.consents.map(function(consent, index){
        if(typeof fields['user_consents_attributes'] == 'undefined'){
          fields['user_consents_attributes'] = [];
        }
        if(typeof fields['user_consents_attributes'].find(o => o.consent_id == consent.id) == "undefined") {
          errors[`consent${consent.id}`] = `Please except the ${consent.name}`;
        }
      });
    }
    this.setState({errors: errors});
    return !Object.keys(errors).length;
  }

  handleChange(event) {
    let fields = this.state.fields;
    if(event.target.name == 'consents'){
      if(typeof fields['user_consents_attributes'] == 'undefined'){
        fields['user_consents_attributes'] = [];
      }
      if(event.target.checked){
        fields['user_consents_attributes'].push({consent_id: parseInt(event.target.value)});
      }else{
        let index = fields['consents'].indexOf(event.target.value);
        if(index > -1){
          fields['user_consents_attributes'].splice(index,1);
        }
      }
    }else{
      fields[event.target.id] = event.target.value;
    }
  }

  handleSubmit(event) {

    if(this.validateForm()){
      this.props.sign_up({sign_up: this.state.fields})
        .then(response => {
          this.setState({success: true});
        })
        .catch(error => {
          var error_message =  "Something went wrong. Please try again later";
          if(error.response.data != null && error.response.data.errors != null){
            error_message = error.response.data.errors.full_messages;
          }
          this.setState({error: true, error_message: error_message});
        });
    }
    event.preventDefault();
  }

  showLoginPage(){
    this.setState({success: false});
    this.props.history.push('/user/login');
  }


  render() {
    const consents = this.state.consents;
    const errors = this.state.errors;
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className='Login'>
            <h3> Register </h3>
            <Form onSubmit={(evt) => this.handleSubmit(evt)}>
                <FormGroup >
                    <Label>Name</Label>
                    <Input
                      autoFocus
                      id='name'
                      type='text'
                      onChange={(evt) => this.handleChange(evt)}
                    />
                    <span style={{color: 'red'}}>{this.state.errors['name']}</span>
                </FormGroup>
                <FormGroup >
                    <Label>Email</Label>
                    <Input
                      autoFocus
                      id='email' 
                      type='text'
                      onChange={(evt) => this.handleChange(evt)}
                    />
                    <span style={{color: 'red'}}>{this.state.errors['email']}</span>
                </FormGroup>
                <FormGroup  >
                    <Label>Password</Label>
                    <Input
                      id='password'
                      onChange={(evt) => this.handleChange(evt)}
                      type='password'
                    />
                    <span style={{color: 'red'}}>{this.state.errors['password']}</span>
                </FormGroup>
                <FormGroup  >
                    <Label>Confirm Password</Label>
                    <Input
                      id='password_confirmation'
                      onChange={(evt) => this.handleChange(evt)}
                      type='password'
                    />
                    <span style={{color: 'red'}}>{this.state.errors['password_confirmation']}</span>
                </FormGroup>
                    
                    { consents.map((consent, idx) => ( <FormGroup key={consent.id} className="mb-0"> 
                            <span className='input-group-text bg-transparent border-0 pl-0'>
                            <Input
                               className='checkbox  pl-4'
                               name="consents"
                               id={`consents[${idx}]`}
                               type='checkbox'
                               onChange={(evt) => this.handleChange(evt)}
                               value={consent.id}
                            />
                            <span className='ml-2'>
                                <span>
                                  {consent.description}
                                </span>
                            </span>
                          </span>
                          <span style={{color: 'red'}}>{errors[`consent${consent.id}`]}</span>
                        </FormGroup>)
                    ) }

                <Button block className='mt-3' type='submit'>
                  Sign up
                </Button> 
                <SweetAlert
                    success
                    show={this.state.success}
                    title="Success"
                    confirmBtnBsStyle="success"
                    onConfirm={() => this.showLoginPage()}
                >
                    Welcome! You have signed up successfully
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
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated } = auth;
  return { isAuthenticated };
}

export default connect(mapStateToProps, {sign_up, loadConsents})(UserSignup);


// SignupForm.propTypes = {
//     history: PropTypes.object.isRequired,
//     signupRequest: PropTypes.func.isRequired
// }