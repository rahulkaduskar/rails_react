import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost } from '../../../actions/posts.js';

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
    window.scrollTo(0, 0)
  }

  render() {
    if (_.isEmpty(this.props.posts)) {
      return <div>Loading...</div>;
    }
    const post = this.props.posts

    return (
      <div>
        <h3>{post.title}</h3>
        <Link className="blue btn btn-small" to="/">Back To Index</Link>
        <p>{post.content}</p>
      </div>
    );
  }
}



function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPost })(PostsShow);


