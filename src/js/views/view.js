// // //

// IMPORTED FILE ----------✅✅✅
import icons from "url:../../img/icons.svg";
// ----------⛔️⛔️⛔️

// VIEW CLASS ----------✅✅✅
export default class View {
  _data;

  // ⏺ render method/function ----------✅✅
  /**
   * render the received object to the DOM
   * @param {Object | Object[]} data the data to be rendered(e.g. recipe)
   * @param {boolean} [render = true] if false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} a markup string is returned if render = false
   * @this {Object} View instance
   * @author pHoenix
   * @todo finish at 28 September
   */
  render(data, render = true) {
    // ⏺ guard clause
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(); // ⏺ isArray() method/function check the given value is an array or not, return boolean

    this._data = data;
    const markup = this._generateMarkup();

    // ⏺ guard clause
    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  // ----------⛔️⛔️

  // ⏺ update method/function ----------✅✅
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup); // ⏺ createRange() method/function creates a new range object, which represents a fragment of a document. It is useful for selecting and manipulating parts of the DOM, such as creating, deleting, or replacing content within that selected range. createContextualFragment() method/function converts a string into a real DOM node objects. This DOM not really living on the page but lives in our memory

    const newElements = Array.from(newDom.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    // console.log(newElements);
    // console.log(curElements);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl)); // ⏺ isEqualNode() method/function checks if two nodes are equal, comparing their structure and attributes, but not their references. it's return boolean

      // ⏺ update change text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // console.log("💕", newEl.firstChild.nodeValue.trim()); // ⏺ firstChild property returns the first child node of an element, which can be a text node, element node or comment node. And nodeValue property gets the value of a node
        curEl.textContent = newEl.textContent;
      }

      // ⏺ update change attributes
      if (!newEl.isEqualNode(curEl)) {
        // console.log(Array.from(newEl.attributes));

        Array.from(newEl.attributes).forEach((attr) => {
          // console.log(attr);
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
  // ----------⛔️⛔️

  // ⏺ clear method/function ----------✅✅
  _clear() {
    this._parentElement.innerHTML = "";
  }
  // ----------⛔️⛔️

  // ⏺ renderSpinner method/function ----------✅✅
  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> 
    `;

    this._clear(); // ⏺ clear the parent element's content before rendering the spinner to avoid duplicate content
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  // ----------⛔️⛔️

  // ⏺ renderError method/function ----------✅✅
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  // ----------⛔️⛔️

  // ⏺ renderSucessMessage method/function ----------✅✅
  renderSucessMessage(message = this._sucessMessage) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  // ----------⛔️⛔️
}
// ----------⛔️⛔️⛔️
