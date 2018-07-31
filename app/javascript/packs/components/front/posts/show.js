import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from "moment";
import { Button } from 'reactstrap';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { fetchPost } from '../../../actions/posts.js';
import PostNew from './new';

class PostsShow extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
        id: this.props.match.params.id, 
        post: null,
        selected_post: null,
        is_loading: false
    };

  }

  componentDidMount() {
    this.setState({
      is_loading: true
    });
    this.props.fetchPost(this.state.id)
      .then(response => {
        this.setState({
          post: response.data.post,
          success: true,
          is_loading: false
        });
      });
  }

  editPost(post){
    this.setState({
      selected_post: post
    })
  }

  render() {
    const post = this.state.post;
    if(post == null){
      return (<div></div>) 
    }else if(this.state.selected_post != null){
      return( <PostNew post={this.state.selected_post}></PostNew>)
    }else{
      return (
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <div className="col-9 p-0 card ">
              <div className="card-header">
                <div className="col-9 float-left">
                  <h3 className='col-10 p-0'> {post.title}</h3> 
                  <small>
                    <span className="date timeago" title={ moment(post.created_at).fromNow() }>
                      { moment(post.created_at).fromNow() }
                    </span>
                  </small>
                </div>
                <Link className="blue btn btn-small float-right" to="/user/posts/">Back</Link>
                <Button  color="link" className='float-right' onClick={() =>  this.editPost(post)}>
                  Edit
                </Button> 
              </div>
              <div className='card-block pt-4 pb-4 pl-3 pr-3'>
                <pre>{ReactHtmlParser(post.content)}</pre>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}



function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPost })(PostsShow);


