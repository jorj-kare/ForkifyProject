import View from './view';
const icons = new URL('../../img/icons.svg', import.meta.url);
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _bntOpen = document.querySelector('.nav__btn--add-recipe');
  _bntClose = document.querySelector('.btn--close-modal');
  _message = 'Recipe was successfully uploaded :)';
  constructor() {
    super();

    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  toggleWindow() {
    console.log(this._overlay);
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._bntOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  _addHandlerHideWindow() {
    this._bntClose.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // Select all ths values from a form
      const dataArr = [...new FormData(this)];
      // Turn an array of entries to an Object
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
