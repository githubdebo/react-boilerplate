/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  LOAD_RECIPES,
  LOAD_RECIPES_SUCCESS,
  SEARCH_RECIPES,
  CURRENT_RECIPE,
  ON_DELETE_RECIPE,
  DELETE_RECIPE_SUCCESS,
  ON_EDIT_RECIPE,
  UPDATE_RECIPE_SUCCESS,
  ON_ADD_RECIPE,
  ADD_RECIPE_SUCCESS
} from './constants';

import axios from 'axios';
/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Search the recipes, this action starts the request saga
 *
 * @return {object} An action object with a type of SEARCH_RECIPES
 */
export function searchRecipes() {
  return {
    type: SEARCH_RECIPES,
  };
}

/**
 * Search the recipes, this action starts the request saga
 *
 * @return {object} An action object with a type of SEARCH_RECIPES
 */
export function onDeleteRecipe() {
  return {
    type: ON_DELETE_RECIPE,
  };
}

/**
 * Search the recipes, this action starts the request saga
 *
 * @return {object} An action object with a type of SEARCH_RECIPES
 */
export function onEditRecipe(recipe) {
  return {
    type: ON_EDIT_RECIPE,
    recipe,
  };
}

/**
 * Search the recipes, this action starts the request saga
 *
 * @return {object} An action object with a type of SEARCH_RECIPES
 */
export function onAddRecipe(recipe) {
  return {
    type: ON_ADD_RECIPE,
    recipe,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

/**
 * Load the recipes, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_RECIPES
 */
export function loadRecipes() {
  return {
    type: LOAD_RECIPES,
  };
}

/**
 * Dispatched when the recipes are loaded by the request saga
 *
 * @param  {array} recipes The recipes data
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the recipes
 */
export function recipesLoaded(recipes, searchtext) {
  return {
    type: LOAD_RECIPES_SUCCESS,
    recipes,
    searchtext,
  };
}

/**
 * Dispatched when the recipes are loaded by the request saga
 *
 * @param  {string} recipe The recipes data
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the recipes
 */
export function recipeDeleted(recipeId) {
  return {
    type: DELETE_RECIPE_SUCCESS,
    recipeId,
  };
}

/**
 * Dispatched when the recipes are loaded by the request saga
 *
 * @param  {string} recipe The recipes data
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the recipes
 */
export function recipeUpdated(recipe) {
  return {
    type: UPDATE_RECIPE_SUCCESS,
    recipe,
  };
}

/**
 * Dispatched when the recipes are loaded by the request saga
 *
 * @param  {string} recipe The recipes data
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the recipes
 */
export function recipeAdded(recipe) {
  return {
    type: ADD_RECIPE_SUCCESS,
    recipe,
  };
}

/**
 * Changes the input field of the form
 *
 * @param  {string} recipe The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_SEARCHTEXT
 */
export function currentRecipe(recipe) {
  return {
    type: CURRENT_RECIPE,
    recipe,
  };
}
