// // //

// IMPORTED FILE ----------✅✅✅
import View from "./view.js";
import icons from "url:../../img/icons.svg";
// ----------⛔️⛔️⛔️

// PAGINATION-VIEW CLASS ----------✅✅✅
class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");
  _sucessMessage = "Recipe was successfully uploaded :)";

  // ⏺ constructor function/method ----------✅✅
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  // ----------⛔️⛔️

  // ⏺ toogleWindow function/method ----------✅✅
  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }
  // ----------⛔️⛔️

  // ⏺ addHandlerShowWindow function/method ----------✅✅
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }
  // ----------⛔️⛔️

  // ⏺ addHandlerHideWindow function/method ----------✅✅
  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }
  // ----------⛔️⛔️

  // ⏺ addHandlerUpload function/method ----------✅✅
  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();

      // console.log(...new FormData(this));
      const dataArr = [...new FormData(this)]; // ⏺ FormData() is a JavaScript built-in object for creating key/value pairs from form fields, useful for sending form data using XMLHttpRequest or Fetch API
      // console.log(data);
      const data = Object.fromEntries(dataArr); // ⏺ Object.fromEntries() converts an array of key-value pairs into a JavaScript object key-value pairs
      handler(data);
    });
  }
  // ----------⛔️⛔️

  // ⏺ generateMarkup function/method ----------✅✅
  _generateMarkup() {}
  // ----------⛔️⛔️
}
export default new AddRecipeView();
// ----------⛔️⛔️⛔️
