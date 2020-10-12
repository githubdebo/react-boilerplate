import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { ON_DELETE_RECIPE } from 'containers/App/constants';
import { recipeDeleted, repoLoadingError } from 'containers/App/actions';
import { makeSelectCurrentRecipe } from '../../App/selectors';
import axios from 'axios';

export function* deleteRecipe() {
  // Select currentRecipe from store
  const currentRecipe = yield select(makeSelectCurrentRecipe());
  console.log('current Recipe In Saga', currentRecipe.id);
  const id = currentRecipe.id;

  try {
    // Call our request helper (see 'utils/request')
    const recipe = axios.delete(`http://localhost:5000/recipes/${id}`);
    const recipeId = id;
    yield put(recipeDeleted(recipeId));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* deleteData() {
  // Watches for ON_DELETE_RECIPE actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeEvery(ON_DELETE_RECIPE, deleteRecipe);
}
