/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_RECIPES,
  LOAD_RECIPES_SUCCESS,
  CURRENT_RECIPE,
  DELETE_RECIPE_SUCCESS,
  UPDATE_RECIPE_SUCCESS,
  ADD_RECIPE_SUCCESS
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  recipes: [],
  current: null,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_REPOS:
        draft.loading = true;
        draft.error = false;
        draft.userData.repositories = false;
        break;

      case LOAD_REPOS_SUCCESS:
        draft.userData.repositories = action.repos;
        draft.loading = false;
        draft.currentUser = action.username;
        break;

      case LOAD_REPOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case LOAD_RECIPES:
        draft.loading = true;
        draft.error = false;
        draft.recipes = [];
        break;

      case LOAD_RECIPES_SUCCESS:
        draft.recipes = action.recipes;
        draft.loading = false;
        break;

      case CURRENT_RECIPE:
        draft.current = action.recipe;
        break;

      case DELETE_RECIPE_SUCCESS:
        draft.recipes = draft.recipes.filter(
          recipe => recipe.id !== action.recipeId,
        );
        draft.current = null;
        break;

      case UPDATE_RECIPE_SUCCESS:
        draft.recipes = state.recipes.map(recipe =>
          recipe.id === action.recipe.id ? action.recipe : recipe,
        );
        break;
      case ADD_RECIPE_SUCCESS:
        draft.recipes = [...state.recipes, action.recipe];
        draft.loading = false;
        break;
    }
  });

export default appReducer;
