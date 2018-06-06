import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, deletePost} from '../../../actions/posts.js';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  onDeleteClick(id) {
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  renderPosts() {
    const posts = this.props.posts
    return _.map(posts, post => {
      return (
          <div key={post.id} className="col s6 m6">
            <div className="card medium">
              <div className="card-image">
                <img src={post.thumb_url}></img>
                <span className="card-title">{post.title}</span>
              </div>
              <div className="card-content">
                <small>{post.created_at}</small>
                <p>I am a very simple card. I am good at containing small bits of ie effectively.</p>
              </div>
              <div className="card-action">
                <Link className="waves-effect blue btn right" to={`/posts/${post.id}`}>Read more</Link>
              </div>
            </div>
          </div>
      );
    });
  }

  render() {
    return (
      <div className="full-width">
        <div className="row">
          <div className="col s12 m8">
            {this.renderPosts()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts, deletePost})(PostsIndex);
