import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../../../actions/posts.js';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';



class PostNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {});
    this.props.history.push('/admin/posts');
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="full-width">
        <div className="row">
          <div className="col s12 m8">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                label="Title For Post"
                name="title"
                component={this.renderField}
              />
              <Field
                label="Post Content"
                name="content"
                component={this.renderField}
              />
              <Link to="/admin/posts" className="btn btn-small orange">Cancel</Link>
              <button type="submit" className="btn btn-small green right">Submit</button>
            </form>
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
  connect(null,{ createPost })(PostNew)
);
