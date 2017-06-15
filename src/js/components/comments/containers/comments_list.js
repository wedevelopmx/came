import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchComments } from '../actions';
import { HourGlass } from 'commons/loaders';

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
    if(Array.isArray(this.props.comments))
      return (<HourGlass></HourGlass>);

    if(Object.keys(this.props.comments).length == 0)
      return (
        <div className="p-a text-center">
          <h6>No existen elementos registrados.</h6>
          <a onClick={ () => this.props.onCreate() } className="md-raised md-mini md-btn md-fab m-b-sm btn-float btn-sm blue">
            <i className="material-icons md-24">add</i>
          </a>
        </div>
      );

    return (
      <div className="p-a">
        <div className="streamline b-l m-l">
          { this.renderComments() }
        </div>
        <a onClick={ () => this.props.onCreate() } className="md-raised md-mini md-btn md-fab m-b-sm btn-float btn-sm blue">
          <i className="material-icons md-24">add</i>
        </a>
      </div>
    );
  }
}

// <div className="fit p-a">
//   <a  className="btn btn-sm btn-block info text-u-c">Nuevo</a>
// </div>

export default connect((state) => {
  return {
    visitor: state.activeVisitor,
    comments: state.comments
  };
}, { fetchComments })(CommentList);
