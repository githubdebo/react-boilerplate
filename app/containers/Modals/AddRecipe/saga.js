import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { ON_ADD_RECIPE } from 'containers/App/constants';
import request from 'utils/request';
import { recipeAdded, repoLoadingError } from 'containers/App/actions';
import axios from 'axios';

export function* addRecipe(action) {
  console.log('Add__Recipe__In__Saga', action.recipe);
  try {
    const requestURL = `http://localhost:5000/recipes`;
    var data = JSON.stringify(action.recipe);
    const recipe = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    yield put(recipeAdded(recipe));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export default function* addData() {
  yield takeEvery(ON_ADD_RECIPE, addRecipe);
}
