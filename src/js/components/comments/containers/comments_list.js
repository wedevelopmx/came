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

      const className = `sl-icon ${'b-' + comment.type}`;
      return (
        <div key={comment.id} className="sl-item">
          <div className="sl-icon" className={className}>
            <i className="material-icons">close</i>
          </div>
          <div className="sl-content">
            <div className="sl-date text-muted">
              { moment(new Date(comment.createdAt)).format('llll') }
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