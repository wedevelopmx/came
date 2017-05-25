import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import CommentForm from 'comments/containers/comment_form';
import CommentList from 'comments/containers/comments_list';

class CommentsInsight extends Component {
  constructor(props) {
    super(props);
    this.state = { newComment: false }
  }

  newComment() {
    this.setState({
      newComment: true
    });
  }

  hideForm() {
    this.setState({
      newComment: false
    });
  }

  render() {
    if(this.state.newComment) {
      return (
        <CommentForm hideForm={ this.hideForm.bind(this) }/>
      );
    } else {
      return (
        <div>
          <CommentList/>
          <div className="box-footer">
            <a onClick={ this.newComment.bind(this) } className="btn btn-sm btn-block info text-u-c">Nuevo</a>
          </div>
        </div>
      );
    }
  }
}

export default CommentsInsight;
