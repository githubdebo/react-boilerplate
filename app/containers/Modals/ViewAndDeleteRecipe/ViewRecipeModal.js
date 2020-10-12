import React, { useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { makeSelectCurrentRecipe } from '../../App/selectors';
import { onDeleteRecipe } from '../../App/actions';
import saga from './saga';

const key = 'viewAndDeleteRecipe';

const ViewRecipeModal = ({ current, onDelete }) => {
  useInjectSaga({ key, saga });
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    if (current) {
      var ingredientsArray = current.ingredientsList.split(',');
      var stepsArray = current.stepsList.split(',');
      setIngredients(ingredientsArray);
      setSteps(stepsArray);
    }
  }, [current]);
  if (current !== null) {
    return (
      <div
        id="view-recipe-modal"
        className="modal"
        style={{ width: '85% !important', maxHeight: '85%' }}
      >
        <div className="modal-content">
          <h4>{current.recipeName}</h4>
          <hr />
          <div
            className="col"
            style={{ textAlign: 'center', marginTop: '20px' }}
          >
            <img
              className="responsive-img"
              data-caption={current.recipeName}
              src={current.recipeImage}
              style={{ height: '350px', width: '830px' }}
            />
          </div>
          <div className="row" style={{ float: 'left' }}>
            <p style={{ fontWeight: 'bold' }}>Ingredients</p>
            <div>
              <span>
                <ul className="collection">
                  {ingredients.map((ingredient, i) => {
                    return (
                      <li
                        className="collection-item"
                        key={i}
                        style={{
                          backgroundColor: 'gray',
                          color: 'white',
                          borderRadius: '5px',
                        }}
                      >
                        <div>{ingredient}</div>
                      </li>
                    );
                  })}
                </ul>
              </span>
            </div>
            <p style={{ fontWeight: 'bold' }}>Steps</p>
            <div>
              <span>
                <ul className="collection">
                  {steps.map((step, i) => {
                    return (
                      <li
                        className="collection-item"
                        key={i}
                        style={{
                          backgroundColor: 'gray',
                          color: 'white',
                          borderRadius: '5px',
                        }}
                      >
                        <div>{step}</div>
                      </li>
                    );
                  })}
                </ul>
              </span>
            </div>
            <div>
              <p style={{ fontWeight: 'bold' }}>Cook</p>
              <p>{current.cookName}</p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect red waves-light btn"
            onClick={onDelete}
          >
            delete recipe
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div id="view-recipe-modal" className="modal">
        <div className="modal-content">
          <div>
            <p>No recipes to show...</p>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  current: makeSelectCurrentRecipe(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onDelete: evt => {
      dispatch(onDeleteRecipe());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ViewRecipeModal);
