import React, { useState, useEffect, memo } from 'react';
import { storage } from '../../../firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { onAddRecipe } from '../../App/actions';
import saga from './saga';

const key = 'addRecipe';

const AddRecipeModal = ({ addRecipe, OnSubmit }) => {
  //Initialize State
  useInjectSaga({ key, saga });
  const [recipeName, setRecipeName] = useState('');
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [currentStep, setCurrentStep] = useState('');
  const [steps, setSteps] = useState([]);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFilePath, setImageFilePath] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cookName, setCookName] = useState('');

  const appendIngredients = () => {
    setIngredients(ingredients => [...ingredients, currentIngredient]);
    setCurrentIngredient('');
  };
  const appendSteps = () => {
    setSteps(steps => [...steps, currentStep]);
    setCurrentStep('');
  };

  const removeFromIngredient = value => {
    setIngredients(ingredients.filter(ingredient => ingredient !== value));
  };

  const removeFromStep = value => {
    setSteps(steps.filter(step => step !== value));
  };

  const handleChange = event => {
    setImage(event);
    setImageName(event.name);
  };

  const uploadImage = image => {
    setLoading(true);
    const uploadTask = storage.ref(`images/${imageName}`).put(image.image);
    uploadTask.on(
      'state_changed',
      snapshot => {
        //progress function...
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setProgress(prog);
      },
      error => {
        //error function...
        console.log(error);
      },
      () => {
        //complete function...
        storage
          .ref('images')
          .child(`${imageName}`)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            setImageUrl(url);
            setLoading(false);
          });
      },
    );
  };

  const ingredientsList = ingredients.toString();
  const stepsList = steps.toString();
  const recipeImage = imageUrl;

  const newRecipe = {
    recipeName,
    ingredientsList,
    stepsList,
    recipeImage,
    cookName,
  };

  function clearTexts() {
    setRecipeName('');
    setIngredients([]);
    setSteps([]);
    //setImage(null);
    //setImageName('');
    //setImageUrl('');
    //setImageFilePath('');
    setCookName('');
  }

  return (
    <div id="add-recipe-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4 style={{ textAlign: 'center' }}>Add your recipe</h4>
        <br />
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="recipeName"
              value={recipeName}
              onChange={e => setRecipeName(e.target.value)}
            />
            <label htmlFor="recipeName" className="active">
              Recipe Name
            </label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <textarea
              name="ingredients"
              value={currentIngredient}
              className="materialize-textarea"
              onChange={e => setCurrentIngredient(e.target.value)}
            />
            <label htmlFor="ingredients">Add Ingredients</label>
          </div>
          <div>
            <a
              href="#!"
              onClick={appendIngredients}
              className="waves-effect teal waves-light btn"
            >
              + Add Ingredient
            </a>
          </div>
        </div>
        <br />
        {ingredients.length > 0 ? (
          <div>
            <span>
              <ul className="collection with-header">
                <li className="collection-header">
                  <p style={{ fontWeight: 'bold' }}>Ingredients</p>
                </li>
                {ingredients.map((ingredient, i) => {
                  return (
                    <li className="collection-item" key={i}>
                      <div>
                        {ingredient}
                        <a
                          href="#!"
                          className="secondary-content"
                          onClick={() => removeFromIngredient(ingredient)}
                        >
                          <i className="material-icons">cancel</i>
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </span>
            <br />
          </div>
        ) : (
          ''
        )}

        <div className="row">
          <div className="input-field col s12">
            <textarea
              name="makingSteps"
              value={currentStep}
              className="materialize-textarea"
              onChange={e => setCurrentStep(e.target.value)}
            />
            <label htmlFor="makingSteps">Add steps in the making</label>
          </div>
          <div>
            <a
              href="#!"
              onClick={appendSteps}
              className="waves-effect teal waves-light btn"
            >
              + Add Step
            </a>
          </div>
        </div>
        <br />
        {steps.length > 0 ? (
          <div>
            <span>
              <ul className="collection with-header">
                <li className="collection-header">
                  <p style={{ fontWeight: 'bold' }}>Steps in the making</p>
                </li>
                {steps.map((step, i) => {
                  return (
                    <li className="collection-item" key={i}>
                      <div>
                        {step}
                        <a
                          href="#!"
                          className="secondary-content"
                          onClick={() => removeFromStep(step)}
                        >
                          <i className="material-icons">cancel</i>
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </span>
          </div>
        ) : (
          ''
        )}
        <br />
        <div className="row">
          <div className="file-field input-field">
            <div className="btn">
              <i className="large material-icons">add_a_photo</i>
              <input
                type="file"
                onChange={e => handleChange(e.target.files[0])}
              />
            </div>
            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                type="text"
                name="imageFilePath"
                placeholder="Select recipe image"
                value={imageFilePath}
                onChange={e => setImageFilePath(e.target.value)}
              />
            </div>
          </div>
          <div>
            <a
              href="#!"
              onClick={() => uploadImage({ image })}
              className="waves-effect teal waves-light btn"
            >
              Upload Image
            </a>
          </div>
          <br />
          {loading ? (
            <div className="progress">
              <div className="determinate" style={{ width: `${progress}%` }} />
            </div>
          ) : (
            ''
          )}
          <br />
          <div>
            <img
              className="materialboxed"
              data-caption={imageName}
              width="250"
              src={imageUrl}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="cookName"
              value={cookName}
              onChange={e => setCookName(e.target.value)}
            />
            <label htmlFor="cookName" className="active">
              Name of the Cook
            </label>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={() => {
            OnSubmit(newRecipe);
            clearTexts();
          }}
          className="modal-close waves-effect green waves-light btn"
        >
          Save
        </a>
        &nbsp;&nbsp;
        <a href="#!" className="modal-close waves-effect red waves-light btn">
          Cancel
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: '55%',
  height: '80%',
};

const mapDispatchToProps = dispatch => {
  console.log('mapDispatchToProps');
  return {
    OnSubmit: rec => {
      dispatch(onAddRecipe(rec));
    },
  };
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddRecipeModal);
