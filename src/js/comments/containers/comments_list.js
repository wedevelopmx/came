import React, { Component } from 'react';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import { fetchComments } from '../actions';

class CommentList extends Component {
  componentDidMount() {
    this.props.fetchComments(this.props.visitor.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visitor && nextProps.visitor.id !== this.props.visitor.id) {
      this.props.fetchComments(nextProps.visitor.id);
    }
  }

  renderComments() {
    if(this.props.comments == null)
      return (<div>Loading...</div>);

    return _.map(this.props.comments, comment => {

      const className = `sl-item ${'b-' + comment.type}`;
      return (
        <div key={comment.id} className={className}>
          <div className="sl-icon">
            <i className="material-icons">close</i>
          </div>
          <div className="sl-content">
            <div className="sl-date text-muted">
              { dateFormat(new Date(comment.createdAt), "dddd, mmmm dS, yyyy, h:MM") }
            </div>
            <div>{ comment.comment }</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="box-body b-t">
        <div className="streamline b-l m-l">
          { this.renderComments() }
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    visitor: state.activeVisitor,
    comments: state.comments
  };
}, { fetchComments })(CommentList);
