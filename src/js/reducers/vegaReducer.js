/* eslint new-cap:0 */
'use strict';

var Immutable = require('immutable');

var actions = require('../actions/Names');

/**
 * This reducer handles whether to recreate the view from the lyra model.
 * @param {boolean} state - The existing model reparse value from the store
 * @param {Object} action - The dispatched action indicating how to modify
 * the reparse flag within the store.
 * @returns {boolean} The new state of the reparse flag
 */
function invalidateVegaReducer(state, action) {
  if (typeof state === 'undefined') {
    return Immutable.Map({
      invalid: false,
      isParsing: false,
    });
  }

  if (action.type === actions.INVALIDATE_VEGA) {
    return state.set('invalid', action.value);
  }

  // All of these actions implicitly invalidate the view
  var invalidatingActions = [
    actions.CREATE_SCENE,
    actions.INIT_SIGNAL,
    actions.ADD_MARK,
    actions.DELETE_MARK,
    actions.RULES_ADD_SCALE_TO_GROUP,
    actions.RULES_ADD_LEGEND_TO_GROUP,
    actions.RULES_ADD_AXIS_TO_GROUP,
    actions.RULES_SET_PROPERTY,
    actions.RULES_DISABLE_PROPERTY,
    actions.RULES_RESET_PROPERTY
  ];
  if (invalidatingActions.indexOf(action.type) >= 0) {
    return state.set('invalid', true);
  }

  if (action.type === actions.PARSE_VEGA) {
    return state.merge({
      isParsing: action.value,
      // Toggle this back to false now that the parse is in progress (or done)
      invalid: false
    });
  }

  return state;
}

module.exports = invalidateVegaReducer;