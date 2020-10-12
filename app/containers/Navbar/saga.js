import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { SEARCH_RECIPES } from 'containers/App/constants';
import { recipesLoaded } from 'containers/App/actions';
import request from 'utils/request';
import { makeSelectSearchtext } from './selectors';

export function* searchRecipesByName() {
  console.log('call____searchRecipe');
  // Select username from store
  const searchtext = yield select(makeSelectSearchtext());
  console.log('searchText', searchtext);
  const requestURL = `http://localhost:5000/recipes?q=${searchtext}`;

  try {
    // Call our request helper (see 'utils/request')
    const recipes = yield call(request, requestURL);
    console.log('test', recipes);
    yield put(recipesLoaded(recipes, searchtext));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* recipeData() {
  console.log('watcher____SearchRecipes');
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeEvery(SEARCH_RECIPES, searchRecipesByName);
  console.log('call____SearchRecipes');
}
