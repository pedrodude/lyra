'use strict';
var React = require('react'),
    connect = require('react-redux').connect,
    Immutable = require('immutable'),
    assets = require('../../util/assets'),
    getInVis = require('../../util/immutable-utils').getInVis,
    Icon   = require('../Icon');

function mapStateToProps(state, ownProps) {
  return {
    filter: getInVis(state, 'datasets.' + ownProps.dsId + '._filter')
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {

  };
}

var FilterField = React.createClass({

  propTypes: {
    field: React.PropTypes.object.isRequired,
    dsId:  React.PropTypes.number,
    filter:  React.PropTypes.instanceOf(Immutable.Map)
  },

  filter: function(evt) {
    var props = this.props,
        field = props.field,
        filter = props.filter,
        dsId = props.dsId;

    
  },

  render: function() {
    return (<Icon onClick={this.filter} glyph={assets.filter} width="10" height="10" />);
  }
});

module.exports = {
  connected: connect(mapStateToProps, mapDispatchToProps)(FilterField),
  disconnected: FilterField
}
