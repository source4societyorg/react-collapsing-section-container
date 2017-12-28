import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { generateId, makeSelectCollapsed, makeSelectTitleClasses, makeSelectCollapseClasses } from './selectors';
import { expandSection, collapseSection, initializeSection } from './actions';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import CollapsingComponent from 'components/CollapsingComponent';

export class CollapsingSectionContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.initializeSectionCall(this.props.id, this.props.collapsed, this.props.collapseClasses, this.props.titleClasses)
  }

  render() {   
    return (
      <CollapsingComponent
        title={this.props.title}
        titleClasses={this.props.titleClasses}
        collapseClasses={this.props.collapseClasses}
        collapsed={this.props.collapsed}
        toggleCollapse={this.props.toggleCollapse}
        id={this.props.id}
      >
        {this.props.children}
      </CollapsingComponent>      
    );
  }
}

CollapsingSectionContainer.defaultProps = {};

CollapsingSectionContainer.propTypes = {
  title: PropTypes.string,
  titleClasses: PropTypes.string,
  collapseClasses: PropTypes.string,
  collapsed: PropTypes.bool,
  initializeSectionCall: PropTypes.func,
  id: PropTypes.string.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  toggleCollapse: (collapsed, uid) => dispatch(collapsed ? expandSection(uid) : collapseSection(uid)),
  initializeSectionCall: (uid, collapse, collapseClasses, titleClasses) => dispatch(initializeSection(uid, collapse, collapseClasses, titleClasses)),
});

const mapStateToProps = (state, ownProps) => {
  return createStructuredSelector({
    collapsed: makeSelectCollapsed(ownProps.id),
    collapseClasses: makeSelectCollapseClasses(ownProps.id),
    titleClasses: makeSelectTitleClasses(ownProps.id),
  })
};

const withReducer = injectReducer({ key: 'collapseSection', reducer });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withReducer,
  withConnect,
)(CollapsingSectionContainer);
