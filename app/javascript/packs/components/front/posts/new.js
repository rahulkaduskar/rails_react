import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TrixEditor } from "react-trix";
import { updatePost, createPost } from '../../../actions/posts.js';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';

import * as validation from '../../../utils/validations.js';

class PostNew extends Component {

  constructor(props) {
    super(props);
    this.state = {  
        fields: {},
        post: this.props.post,
        errors: {},
        success:  false,
        error: false,
        is_edit: false
    };
    if(this.state.post != null){
      this.state.fields = { title: this.state.post.title, content: this.state.post.content };
      this.state.is_edit = true;
    }else{
      this.state.fields = { title: '', content: '' };
    }
    this.create.bind(this);
    this.update.bind(this);
  }

  onSubmit(event) {
    if(this.state.is_edit){
      this.update();
    }else{
      this.create();
    }
  }

  create() {
    this.props.createPost(this.state.fields)
        .then(response => {
          this.setState({success: true});
          this.props.history.push('/user/posts');
        })
        .catch(error => {
          var error_message =  "Something went wrong. Please try again later";
          if(error.response.data != null && error.response.data.errors != null){
            error_message = error.response.data.errors.full_messages;
          }
          this.setState({error: true, error_message: error_message});
        });
  }

  update() {
    this.props.updatePost(this.state.post.id, this.state.fields)
        .then(response => {
          this.setState({success: true});
          this.props.history.push('/user/posts');
        })
        .catch(error => {
          var error_message =  "Something went wrong. Please try again later";
          if(error.response.data != null && error.response.data.errors != null){
            error_message = error.response.data.errors.full_messages;
          }
          this.setState({error: true, error_message: error_message});
        });
  }

  handleEditorReady(editor) {
    editor.insertText("editor is ready");
  }
  handleChange(html, text) {
    let fields = this.state.fields;
    fields['content'] = html;
  }

  onChange(event) {
    let fields = this.state.fields;
    fields[event.target.id] = event.target.value;
  }

  render() {
    const { handleSubmit } = this.props;
    const heading = this.state.is_edit ? 'Update post' : 'Create Post'
    const post = this.state.fields;
    return (
      <div className="col-12">
        <div className="d-flex justify-content-center">
          <div className="col-9 p-0 card ">
            <div className="card-header">
              <h3> {heading} </h3> 
            </div>
            <div className="card-block pt-3">
              <form className="form-inline" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className="form-group col-12 p-0 mb-3">
                  <label className="col-2 mr-2">Title</label>
                  <div className="col-9 p-0">
                    <Field name="title" type="text"
                      label="title"
                      component={validation.renderField}
                      value={post.title}
                      onChange={(evt) => this.onChange(evt)}
                      validate={validation.required, validation.maxLength15}
                    />
                  </div>
                </div>
                <div className="form-group col-12 p-0">
                  <label className="col-2 mr-2">Content</label>
                  <div className="col-9 p-0">
                    <TrixEditor value={post.content} onChange={this.handleChange.bind(this)} onEditorReady={this.handleReady} />
                  </div>
                </div>
                <div className="col-11 mt-4 mb-3 pr-0 ml-2">
                  <button type="submit" className="btn btn-primary float-right">Submit</button>
                  <Link to="/user/posts" className="btn btn-secondary float-right mr-2">Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.content) {
    errors.content = 'Enter some content please';
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null,{ createPost, updatePost })(PostNew)
);
