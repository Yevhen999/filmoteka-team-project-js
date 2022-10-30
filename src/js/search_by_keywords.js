import { QueryHandler } from './query_handler';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createCardMarkup } from './card_markup';
import localStorageMethod from './locale-storage-methods';
import Spinner from './spinner';
import { pagination, FILMS } from './render_trending';
import localStorageMethod from './locale-storage-methods';
import { localeStorageKeys } from './localStorageKeys';

const queryHandler = new QueryHandler();
const filmListRef = document.querySelector('.card-list');

const spinner = new Spinner({
  selector: '[data-action="load-spinner"]',
});

Notify.init({
  timeout: 1500,
  position: 'center-top',
  backOverlay: false,
  opacity: 0.8,
  borderRadius: '25px',
});

export async function handleSubmit(evt) {
  evt.preventDefault();
  const {
    elements: { searchQuery },
  } = evt.target;
  const valueSearchQuery = searchQuery.value.trim().toLowerCase();
  if (!valueSearchQuery) {
    Notify.failure('Enter the name of the movie!');
    return;
  }

  spinner.disable();
  queryHandler.query = valueSearchQuery;
  try {
    const { results, total_results, page, total_pages } =
      await queryHandler.fetchQueryResultsForMovieSearch();

    if (!results.length) {
      queryHandler.query = localStorageMethod.load(
        localeStorageKeys.LAST_REQUEST
      );
      return Notify.failure(
        'Search result not successful. Enter the correct movie name.'
      );
    }

    localStorageMethod.save(localeStorageKeys.LAST_REQUEST, valueSearchQuery);
    pagination.removeMarkup();
    if (total_pages > 1) {
      pagination.totalPages = total_pages;
      pagination.page = page;
      pagination.fetch = page =>
        queryHandler.fetchQueryResultsForMovieSearch(page);

      pagination.renderMarkup();
    }
    if (!results.length) {
      Notify.failure(
        'Search result not successful. Enter the correct movie name.'
      );
      spinner.enable();
      return;
    }

    Notify.success(`Hooray! We found ${total_results} movie!`);

    localStorageMethod.remove(FILMS);
    localStorageMethod.save(FILMS, results);

    const markup = results.map(createCardMarkup).join('');
    filmListRef.innerHTML = markup;
  } catch (error) {
    console.log(error);
  } finally {
    spinner.enable();
  }
}
