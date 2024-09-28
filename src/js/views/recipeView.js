// // //

// IMPORTED FILE ----------✅✅✅
import View from "./view.js";

import icons from "url:../../img/icons.svg"; // ⏺ it's help Parcel to find the file path, we use (url:) to tell Parcel to treat the imported file as a URL, ensuring it can be correctly processed and referenced in the application
// console.log(icons);

import Fracty from "fracty"; // ⏺ when we install packages from npm, we can import them directly by name without specifying a path
// console.log(Fracty);
// ----------⛔️⛔️⛔️

// RECIPE-VIEW CLASS ----------✅✅✅
class RecipeView extends View {
  // mind🤯 that, still! babel and parcel doesn't support private(#) field, so we have to use procted(_) field

  _parentElement = document.querySelector(".recipe");
  _errorMessage = "We could not find that recipe. Please try another one!";
  _sucessMessage = "";

  // ⏺ addHandlerRender method/function ----------✅✅
  addHandlerRender(handler) {
    // ⏺ window.addEventListener("load", controlRecipes): This event listener triggers the controlRecipes function when the entire page (including all assets like images and scripts) has fully loaded. This ensures that the initial content is displayed based on the default hash or URL state. So, when the page first loads, the load event fires, calling controlRecipes to display the initial content based on the current hash. mind🤯 that, load event fires at the beginning when the entire page has fully loaded

    // ⏺ window.addEventListener("hashchange", controlRecipes): This event listener triggers the controlRecipes function whenever the URL’s hash changes (when the part of the URL after # is updated). This allows the application to update the displayed content dynamically without reloading the entire page. So, if the user changes the hash in the URL (like clicking something that modifies the hash), the hashchange event fires, calling controlRecipes again to update the displayed content

    // ⏺ we use the window object with addEventListener to listen for events that affect the entire browser window. window object controls everything related to the browser like webpage(document), events, URL, Browser history, Timers, Storage and many more. So window object is a huge deal

    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }
  // ----------⛔️⛔️

  // ⏺ addHandlerUpdateServings method/function ----------✅✅
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--update-servings");

      // ⏺ guard clause
      if (!btn) return;

      // console.log(btn);
      // const updateTo = +btn.dataset.updateTo; // update-to === updateTo
      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }
  // ----------⛔️⛔️

  // ⏺ addHandlerAddBookmark function/method ----------✅✅
  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");

      // ⏺ guard clause
      if (!btn) return;

      handler();
    });
  }
  // ----------⛔️⛔️

  // ⏺ generateMarkup function/method ----------✅✅
  _generateMarkup() {
    // console.log(this._data);
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.servings - 1
          }">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.servings + 1
          }">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

     <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${this._data.ingredients.map(this._generateMarkupIngredient).join("")}
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
    `;
  }
  // ----------⛔️⛔️

  // ⏺ generateMarkupIngredient function/method ----------✅✅
  _generateMarkupIngredient(ing) {
    return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ing.quantity ? Fracty(ing.quantity).toString() : ""
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>
  `;
  }
  // ----------⛔️⛔️
}
export default new RecipeView(); // ⏺ we use the new keyword here to create a new instance of the RecipeView class immediately when it’s imported
// ----------⛔️⛔️⛔️
