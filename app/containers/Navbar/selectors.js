/**
 * Navbar selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectNavbar = state => state.navbar || initialState;

const makeSelectSearchtext = () =>
  createSelector(
    selectNavbar,
    navbarState => navbarState.searchtext,
  );

export { selectNavbar, makeSelectSearchtext };
