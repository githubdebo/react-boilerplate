/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import styled from 'styled-components';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Navbar from 'containers/Navbar';
import Logo from 'components/Header/Logo';

import Recipes from 'containers/Recipes';
import AddBtn from 'containers/AddButton/AddBtn';
import AddRecipeModal from 'containers/Modals/AddRecipe/AddRecipeModal';
import ViewRecipeModal from 'containers/Modals/ViewAndDeleteRecipe/ViewRecipeModal';
import EditRecipeModal from 'containers/Modals/EditRecipe/EditRecipeModal';
import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  //max-width: calc(768px + 16px * 2);
  //margin: 0 auto;
  //display: flex;
  //min-height: 100%;
  //padding: 0 16px;
  //flex-direction: column;
`;

const App = () => {
  useEffect(() => {
    //Init Materialize JS
    M.AutoInit();
  }, []);

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Navbar />
      <Logo />
      <Recipes />
      <AddBtn />
      <AddRecipeModal />
      <ViewRecipeModal />
      <EditRecipeModal />
      {/* <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/features" component={FeaturePage} />
        <Route path="" component={NotFoundPage} />
      </Switch> */}
      {/* <Footer /> */}
      <GlobalStyle />
    </AppWrapper>
  );
};

export default App;
