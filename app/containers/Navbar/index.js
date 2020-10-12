import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { searchRecipes } from '../App/actions';
import { changeSearchText } from './actions';
import { makeSelectSearchtext } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'navbar';

export function Navbar({ searchtext, onChangeSearchText, cancelSearch, onSubmitForm }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (searchtext && searchtext.length > 0) onSubmitForm();
  }, []);

  return (
    <div>
      <nav style={{ marginBottom: '30px' }} className="blue">
        <div className="nav-wrapper">
          <form onSubmit={onSubmitForm}>
            <div className="input-field">
              <input
                id="searchtext"
                type="search"
                placeholder="Search Recipes..."
                value={searchtext}
                onChange={onChangeSearchText}
              />
              <label className="label-icon" htmlFor="searchText">
                <i className="material-icons">search</i>
              </label>
              <i className="material-icons" onClick={cancelSearch}>close</i>
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  searchtext: makeSelectSearchtext(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeSearchText: evt => {
      dispatch(changeSearchText(evt.target.value));
      dispatch(searchRecipes());
    },
    cancelSearch: evt => {
      dispatch(changeSearchText(''));
      dispatch(searchRecipes());
  },

    //Commentted on Submit functionality
    // onSubmitForm: evt => {
    //   if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    //   dispatch(searchRecipes());
    // },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Navbar);

//export default Navbar;
