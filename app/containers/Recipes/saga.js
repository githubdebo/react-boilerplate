/**
 * Gets the recipes
 */

import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { LOAD_RECIPES } from 'containers/App/constants';
import { recipesLoaded } from 'containers/App/actions';

import request from 'utils/request';

/**
 * recipes request/response handler
 */
export function* getRecipes() {
  const requestURL = `http://localhost:5000/recipes`;

  try {
    // Call our request helper (see 'utils/request')
    const recipes = yield call(request, requestURL);
    console.log('test', recipes);
    yield put(recipesLoaded(recipes));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* recipeData() {
  // Watches for LOAD_RECIPES actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeEvery(LOAD_RECIPES, getRecipes);
}
