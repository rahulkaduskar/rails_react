import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from "moment";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Loader from 'react-loader';
import truncate from 'truncate-html';
import { fetchPosts, deletePost} from '../../../actions/posts.js';

class PostsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {  
        posts: [],
        loaded: true
    };
  }

  componentDidMount() {
    this.state.loaded = false;
    this.props.fetchPosts()
      .then(response => {
        this.setState({
          posts: response.data.posts,
          success: true,
          loaded: true
        });
      });
  }
  


  onDeleteClick(id) {
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }
  
  renderPosts() {
    const posts = this.state.posts;
    const loaded = this.state.loaded;
    const options = {
      lines: 13, length: 20, width: 3, radius: 20, scale: 0.50,
      corners: 1, color: '#04048a', opacity: 0.25, rotate: 0, direction: 1,
      speed: 1, trail: 60, fps: 20, zIndex: 2e9,
      top: '50%', left: '50%', shadow: false, hwaccel: false, position: 'absolute'
    };
    if(!posts.length && !loaded){
      return (
        <div className="col-9">
          <h3>No Post Available </h3>
          <Link className="waves-effect blue btn right" to={`/user/posts/new`}>Create New</Link>
        </div>
      )
    }else if(posts.length && loaded) {
      return(
        <div className='col-sm'>
          <div className='row m-0 pb-2 d-inline-block col-12 p-0'>
            <h4 className='float-left'> My Posts</h4>
            <Link className="waves-effect blue btn float-right" to={`/user/posts/new`}>Create New</Link>
          </div>
          <div className='col-12 d-flex p-0'>
            { posts.map((post, idx) => (
                <div key={post.id} className="col-4 float-left pl-0">
                  <div className="card col-12 p-0 h-100">
                    <div className="card-header">
                      <div className="card-title">{post.title}</div>
                      <small>
                        <span className="date timeago" title={ moment(post.created_at).fromNow() }>
                          { moment(post.created_at).fromNow() }
                        </span>
                      </small>
                    </div>
                    <div className="card-block pb-0 pl-2 pt-2 pr-2 mb-0">
                      <pre className="m-0">{ReactHtmlParser(truncate(post.content, 20, { ellipsis: '' }))}
                      ...<Link className="waves-effect blue btn pl-2 pb-2 pt-0" to={`/user/posts/${post.id}`}>Read more</Link>
                      </pre>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        )
    }else{
      return (
        <Loader loaded={false} options={options} className="spinner">
          <div>loading</div>
        </Loader>
      )
    }
  }

  render() {
    return (
      <div className="col-12">
          {this.renderPosts()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts, deletePost})(PostsIndex);
