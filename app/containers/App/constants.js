/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';

//Recipes
export const LOAD_RECIPES = 'boilerplate/App/LOAD_RECIPES';
export const SEARCH_RECIPES = 'boilerplate/App/SEARCH_RECIPES';
export const LOAD_RECIPES_SUCCESS = 'boilerplate/App/LOAD_RECIPES_SUCCESS';
export const CURRENT_RECIPE = 'boilerplate/App/CURRENT_RECIPE';
export const ON_DELETE_RECIPE = 'boilerplate/App/ON_DELETE_RECIPE';
export const DELETE_RECIPE_SUCCESS = 'boilerplate/App/DELETE_RECIPE_SUCCESS';
export const ON_EDIT_RECIPE = 'boilerplate/App/ON_EDIT_RECIPE';
export const UPDATE_RECIPE_SUCCESS = 'boilerplate/App/UPDATE_RECIPE_SUCCESS';
export const ON_ADD_RECIPE = 'boilerplate/App/ON_ADD_RECIPE';
export const ADD_RECIPE_SUCCESS = 'boilerplate/App/ADD_RECIPE_SUCCESS';
