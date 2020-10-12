import React, { useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRecipes,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { loadRecipes } from '../App/actions';
import saga from './saga';
import RecipeItem from '../RecipeItem';

const key = 'recipes';

const Recipes = ({ loading, error, recipes, loadRecipes }) => {
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadRecipes();
  }, []);

  if (loading || recipes === null) {
    return <div>Loading...</div>;
  } else {
    return (
      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gridGap: '1rem',
          marginTop: '50px',
        }}
      >
        {!loading && recipes.length === 0 ? (
          <p>No recipes to show...</p>
        ) : (
          recipes.map(recipe => <RecipeItem key={recipe.id} recipe={recipe} />)
        )}
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  recipes: makeSelectRecipes(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const mapDispatchToProps = { loadRecipes };

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Recipes);
