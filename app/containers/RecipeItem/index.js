import React, { memo } from 'react';
import { connect } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { currentRecipe } from '../App/actions';
import reducer from '../App/reducer';

const key = 'recipeitem';
export function RecipeItem({ recipe, currentRecipe }) {
  useInjectReducer({ key, reducer });
  return (
    <div className="row">
      <div className="col m12">
        <div className="card">
          <div className="card-image">
            <img src={recipe.recipeImage} style={{ height: 220 }} />
            <a
              href="#edit-recipe-modal"
              className="btn-floating halfway-fab waves-effect waves-light teal modal-trigger"
              onClick={() => currentRecipe(recipe)}
            >
              <i className="material-icons">edit</i>
            </a>
          </div>
          <div className="card-content">
            <p style={{ fontWeight: 'bold' }}>{recipe.recipeName}</p>
          </div>
          <div className="card-action" style={{ textAlign: 'center' }}>
            <a
              href="#view-recipe-modal"
              className="modal-trigger"
              onClick={() => currentRecipe(recipe)}
            >
              More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(
  null,
  { currentRecipe },
)(RecipeItem);
