// // //

// IMPORTED FILE ----------✅✅✅
import { API_URL, RECIPE_PER_PAGE, KEY } from "./config.js";
import { AJAX } from "./helper.js";
// ----------⛔️⛔️⛔️

// STATE OBJECT ----------✅✅✅
export const state = {
  recipe: {},

  search: {
    query: "",
    results: [],
    resultsPerPage: RECIPE_PER_PAGE,
    page: 1, // ⏺ default
  },

  bookmarks: [],
};
// ----------⛔️⛔️⛔️

// CREATE-RECIPE-OBJ NICER FUNCTION ----------✅✅✅
const createRecipeObjNicer = function (data) {
  // ⏺ make the recipe obj properties name nicer
  const { recipe } = data.data;
  // console.log(recipe);
  // console.log(recipe.key);

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,

    ...(recipe.key && { key: recipe.key }), // ⏺ short circuit:
  };
  // console.log(state.recipe);
};
// ----------⛔️⛔️⛔️

// LOAD-RECIPE FUNCTION ----------✅✅✅
export const loadRecipe = async function (id) {
  try {
    // ⏺ API request
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    // console.log(data);

    // ⏺ set the recipe's value from state obj
    state.recipe = createRecipeObjNicer(data);

    // ⏺ check the bookmark at the beginnings
    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    // console.log(state.recipe);
  } catch (error) {
    // console.error(`${error} ❗️❗️`);
    throw error;
  }
};
// ----------⛔️⛔️⛔️

// LOAD-SEARCH RESULT FUNCTION ----------✅✅✅
export const loadSearchResults = async function (query) {
  try {
    // ⏺ store the query string in the state object for future reference
    state.search.query = query;
    // console.log(state.search.query);

    // ⏺ API request
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    // console.log(data);

    // ⏺ make the recipes obj properties name nicer and ready fo the results
    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
      };
    });
    // console.log(state.search.results);

    state.search.page = 1; // ⏺ reset
  } catch (error) {
    // console.error(`${error} ❗️❗️`);
    throw error;
  }
};
// loadSearchResults("pizza");
// ----------⛔️⛔️⛔️

// PAGINATION FUNCTION ----------✅✅✅
export const getSearchResultsPage = function (page = state.search.page) {
  // ⏺ store the current page
  state.search.page = page;

  // ⏺ suppose page 1 hole start hobe 0 and end hobe 10, but slice method count korbe 0 --> 9
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};
// ----------⛔️⛔️⛔️

// UPDATE SERVINGS FUNCTION ----------✅✅✅
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = ing.quantity * (newServings / state.recipe.servings);
    // ⏺ newQt = oldQt * (newServings / oldServings) example: 2 * 8 / 4 = 2 * 2 = 4  So, if we double the new servings like this, then we also need to double the new quantity
  });

  state.recipe.servings = newServings;
};
// ----------⛔️⛔️⛔️

// PERSISTS BOOKMARKS FUNCTION ----------✅✅✅
const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};
// ----------⛔️⛔️⛔️

// ADD BOOKMARK FUNCTION ----------✅✅✅
export const addBookmark = function (recipe) {
  // ⏺ add bookmark
  state.bookmarks.push(recipe);
  // console.log(state.bookmarks);

  // ⏺ mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};
// ----------⛔️⛔️⛔️

// DELETE BOOKMARK FUNCTION ----------✅✅✅
export const deleteBookmark = function (id) {
  // ⏺ delete bookmark
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);

  // ⏺ mark current recipe as not bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};
// ----------⛔️⛔️⛔️

// INIT FUNCTION ----------✅✅✅
const init = function () {
  const storage = localStorage.getItem("bookmarks");

  if (storage) state.bookmarks = JSON.parse(storage);
};
init(); // ⏺ call the function right at the beginnings
// console.log(state.bookmarks);
// ----------⛔️⛔️⛔️

// CLEAR FUNCTION FOR DEBUGGER  ----------✅✅✅
const clearBookmarks = function () {
  localStorage.clear("bookmarks");
};
// clearBookmarks(); // ⏺ when clearBookmarks() is turn on we have to also turn off the init()
// ----------⛔️⛔️⛔️

// UPLOAD RECIPE FUNCTION  ----------✅✅✅
export const uploadRecipe = async function (newRecipe) {
  try {
    // console.log(newRecipe);
    // console.log(Object.entries(newRecipe));

    // ⏺ Object.entries() converts an object into an array of its key-value pairs. Object.fromEntries() er biporit
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingArr = ing[1].split(",").map((el) => el.trim());

        // ⏺ guard clause with error handling
        if (ingArr.length !== 3)
          throw new Error(
            "❗️ wrong ingredient format! please use the correct format :)"
          );

        const [quantity, unit, description] = ingArr;
        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });

    // ⏺ changed the properties name just like the properties of the API
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    // console.log(ingredients, recipe);

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    // console.log(data);

    state.recipe = createRecipeObjNicer(data);
    // console.log(state.recipe);
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};
// ----------⛔️⛔️⛔️
