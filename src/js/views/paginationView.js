import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPege = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1 , and there are other pages
    if (curPege === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curPege + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPege + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }

    // last page
    if (curPege === numPages && numPages > 1) {
      return `
        <button data-goto="${
          curPege - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPege - 1}</span>
        </button>
      `;
    }

    // other page
    if (curPege < numPages) {
      return `
        <button data-goto="${
          curPege - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPege - 1}</span>
        </button>
        <button data-goto="${
          curPege + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPege + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }

    // page 1 , and there are NO other pages
    return '';
  }
}

export default new PaginationView();
