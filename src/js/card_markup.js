import { createStringOfGenresForCard } from './genres_storage';

export function createCardMarkup(data) {
  const {
    title,
    poster_path = 'https://www.bworldonline.com/wp-content/uploads/2022/04/cinema02_14-01.jpg',
    release_date,
    genre_ids,
    id,
  } = data;
  let date = release_date;
  if (!date) {
    date = 'No information';
  } else {
    date = release_date.slice(0, 4);
  }

  let cardGenres;
  if (!genre_ids) {
    cardGenres = 'No information';
  } else {
    cardGenres = createStringOfGenresForCard(genre_ids);
  }

  return `
    <li class="card__container" data-id="${id}">
    <a class="link card-film-link" href="#" aria-label="${title}">
    <img class="card__poster" alt='poster' data-id="${id}" src="https://image.tmdb.org/t/p/w500/${poster_path}" height="574"  width="395"/>
    <div class="description-wrapper">
    <b class="card__film-name">${title}</b>
    <p class="card__description">${cardGenres}<span class="film-year">${date}</span>
    </p>
    </div>
    </a>
    </li>`;
}
