/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_SEARCHTEXT } from './constants';

// The initial state of the App
export const initialState = {
  searchtext: '',
};

/* eslint-disable default-case, no-param-reassign */
const navbarReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_SEARCHTEXT:
        draft.searchtext = action.searchtext.replace(/@/gi, '');
        break;
    }
  });

export default navbarReducer;
