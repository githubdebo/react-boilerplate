import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { ON_EDIT_RECIPE } from 'containers/App/constants';
import { recipeUpdated, repoLoadingError } from 'containers/App/actions';
import request from 'utils/request';
import axios from 'axios';

export function* editRecipe(action) {
  try {
    const requestURL = `http://localhost:5000/recipes/${action.recipe.id}`;
    var data = JSON.stringify(action.recipe);
    const recipe = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    yield put(recipeUpdated(recipe));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export default function* editData() {
  yield takeEvery(ON_EDIT_RECIPE, editRecipe);
}
