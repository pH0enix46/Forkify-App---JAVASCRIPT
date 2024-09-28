// // //

// IMPORTED FILE ----------✅✅✅
import View from "./view.js";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg";
// ----------⛔️⛔️⛔️

// RESULT-VIEW CLASS ----------✅✅✅
class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found for your query! Please try again :)";
  _sucessMessage = "";

  // ⏺ generateMarkup function/method ----------✅✅
  _generateMarkup() {
    // console.log(this._data); // array

    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
  // ----------⛔️⛔️
}
export default new ResultsView();
// ----------⛔️⛔️⛔️
