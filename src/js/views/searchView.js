// // //

// SEARCH-VIEW CLASS ----------✅✅✅
class SearchView {
  _parentElement = document.querySelector(".search");

  // ⏺ getQuery method/function ----------✅✅
  getQuery() {
    // ⏺ user search input
    const query = this._parentElement.querySelector(".search__field").value;

    this._clearInput();
    return query;
  }
  // ----------⛔️⛔️

  // ⏺ clearInput method/function ----------✅✅
  _clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
  }
  // ----------⛔️⛔️

  // ⏺ addHandlerSearch method/function ----------✅✅
  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
    // mind that, <button> is acting as a submit event when it’s inside a <form>
  }
  // ----------⛔️⛔️
}
export default new SearchView(); // ⏺ we use the new keyword here to create a new instance of the SearchView class immediately when it’s imported
// ----------⛔️⛔️⛔️
