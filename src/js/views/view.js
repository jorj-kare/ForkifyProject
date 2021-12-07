const icons = new URL('../../img/icons.svg', import.meta.url);
export default class View {
  _data;
  //updates only the parts of the page that have change.

  renderMessage(message = this._message) {
    const markup = `<div class="message">
    <div>
      <svg>
        <use href=${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();
    //Creates a DOM object
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newEl = Array.from(newDOM.querySelectorAll('*'));
    const curEl = Array.from(this._parentElement.querySelectorAll('*'));

    newEl.forEach((el, i) => {
      const curElement = curEl[i];

      //updates changed text
      if (
        !el.isEqualNode(curElement) &&
        el.firstChild?.nodeValue.trim() !== ''
      ) {
        curElement.textContent = el.textContent;
      }
      //update changed attributes
      if (!el.isEqualNode(curElement)) {
        Array.from(el.attributes).forEach(attr =>
          curElement.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;

    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const markup = `<div class='spinner'>
    <svg><use href='${icons}#icon-loader'></use></svg>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }
  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }
}
