// // //

// IMPORTED FILE ----------✅✅✅
import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./views/recipeView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
// ----------⛔️⛔️⛔️

// HOT MODULE (HMR) ----------✅✅✅
// if (module.hot) {
//   module.hot.accept();
// }
// ----------⛔️⛔️⛔️

// CONTROL-RECIPES FUNCTION ----------✅✅✅
const controlRecipes = async function () {
  try {
    // ⏺ unique id
    // console.log(window.location); // ⏺ location is a property of the window object that contains information about the current URL
    // console.log(window.location.hash);
    const id = window.location.hash.slice(1); // ⏺ hash is a property of location
    // console.log(id);

    // ⏺ guard clause
    if (!id) return;

    // ⏺ call the spinner
    recipeView.renderSpinner();

    // ⏺ update results view to mark selected search result
    // resultView.render(model.getSearchResultsPage());
    resultView.update(model.getSearchResultsPage());

    // ⏺ updating bookmarks view
    // debugger;
    bookmarksView.update(model.state.bookmarks);

    // ⏺ loading recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;
    // console.log(recipe);

    // ⏺ rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(`❗${error}`);
    // recipeView.renderError(`${error} ❗️❗️`);
    recipeView.renderError();
  }
};
// controlRecipes();
// ----------⛔️⛔️⛔️

// CONTROL-SEARCH RESULT FUNCTION ----------✅✅✅
const controlSearchResults = async function () {
  try {
    // console.log(resultView);

    // ⏺ call the spinner
    resultView.renderSpinner();

    // ⏺ get the query
    const query = searchView.getQuery();
    // console.log(query);

    // ⏺ guard clause
    if (!query) return;

    // ⏺ searching results
    await model.loadSearchResults(query);
    // console.log(model.state.search.results);

    // ⏺ rendering the results
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultsPage());
    // console.log(model.getSearchResultsPage());

    // ⏺ render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    // console.error(`❗${error}`);
  }
};
// controlSearchResults();
// ----------⛔️⛔️⛔️

// PAGINATION CONTROLLER FUNCTION ----------✅✅✅
const controlPagination = function (goToPage) {
  // console.log(goToPage);

  // ⏺ rendering the new results
  resultView.render(model.getSearchResultsPage(goToPage));

  // ⏺ render new pagination buttons
  paginationView.render(model.state.search);
};
// ----------⛔️⛔️⛔️

// CONTROL SERVINGS (BASED ON USER) FUNCTION ----------✅✅✅
const controlServings = function (newServings) {
  // ⏺ update the recipe servings (in state)
  model.updateServings(newServings);

  // ⏺ update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
// ----------⛔️⛔️⛔️

// CONTROL ADD BOOKMARK FUNCTION ----------✅✅✅
const controlAddBookmark = function () {
  // ⏺ add/delete the bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);

  // ⏺ update recipe view
  recipeView.update(model.state.recipe);

  // ⏺ render bookmarks
  bookmarksView.render(model.state.bookmarks);
};
// ----------⛔️⛔️⛔️

// CONTROL BOOKMARKS FUNCTION ----------✅✅✅
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
// ----------⛔️⛔️⛔️

// CONTROL ADD-RECIPE FUNCTION ----------✅✅✅
const controlAddRecipe = async function (newRecipe) {
  try {
    // console.log(newRecipe);
    // console.log(typeof newRecipe);

    // ⏺ loading spinner
    addRecipeView.renderSpinner();

    // ⏺ upload the new recipe data
    await model.uploadRecipe(newRecipe);
    // console.log(model.state.recipe);

    // ⏺ render recipe
    recipeView.render(model.state.recipe);

    // ⏺ sucess message
    addRecipeView.renderSucessMessage();

    // ⏺ render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // ⏺ change id in url
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    // ⏺ history property allows navigation and manipulation of the browser’s session(it's the list of pages a user has visited in the current tab) history.
    // ⏺ pushState(state, title, url ) method/fucntion allows you to add a new entry to the browser’s session history without reloading the page

    // ⏺ close the form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.error(error);
    addRecipeView.renderError(error.message);
  }
};
// ----------⛔️⛔️⛔️

// INIT FUNCTION ----------✅✅✅
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks); // ⏺ same logic

  recipeView.addHandlerRender(controlRecipes);
  // ⏺ init function is called at the very beginning and immediately run addHandlerRender function. After that, any new event (like a click or another hash change) will trigger the controlRecipes function. mind🤯 that, the init function is called only once at the beginning

  recipeView.addHandlerUpdateServings(controlServings); // ⏺ same logic
  recipeView.addHandlerAddBookmark(controlAddBookmark); // ⏺ same logic
  searchView.addHandlerSearch(controlSearchResults); // ⏺ same logic
  paginationView.addHandlerClick(controlPagination); // ⏺ same logic
  addRecipeView.addHandlerUpload(controlAddRecipe); // ⏺ same logic
};
init();
// ----------⛔️⛔️⛔️
