import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchComments } from '../actions';

class CommentList extends Component {
  componentDidMount() {
    moment.locale('es');
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

      const className = `w-40 circle ${comment.type}`;
      return (
        <div key={comment.id} className="sl-item">
          <div className="sl-left">
            <span className={className}>
              <i className="material-icons">mode_comment</i>
            </span>
          </div>
          <div className="sl-content">
            <div className="sl-date text-muted">
              { moment(new Date(comment.createdAt)).format('ddd, MMMM Do YYYY, h:mm a') }
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
        <div className="box-footer">
          <a onClick={ this.props.hide } className="btn btn-sm btn-block info text-u-c">Nuevo</a>
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
