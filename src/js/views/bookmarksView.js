// // //

// IMPORTED FILE ----------✅✅✅
import View from "./view.js";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg";
// ----------⛔️⛔️⛔️

// BOOKMARKS-VIEW CLASS ----------✅✅✅
class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";
  _sucessMessage = "";

  // ⏺ addHandlerRender function/method ----------✅✅
  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }
  // ----------⛔️⛔️

  // ⏺ generateMarkup function/method ----------✅✅
  _generateMarkup() {
    // console.log(this._data); // array

    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
  // ----------⛔️⛔️
}
export default new BookmarksView();
// ----------⛔️⛔️⛔️
