"use strict";

function createFilmRow(film) {
	const li = document.createElement("li");
  li.classList.add("list-group-item");
	li.setAttribute("id", `film-${film.id}-wrapper`);

  const div = document.createElement("div");
	div.setAttribute("id", `film-${film.id}`);
  li.appendChild(div);


	const divTitle = document.createElement("div");
	divTitle.innerText = film.title;
	div.appendChild(divTitle);

	// TODO stars instead of text
	const divFavorite = document.createElement("div");
	divFavorite.innerText = film.favorite;
	div.appendChild(divFavorite);

	const divWatchDate = document.createElement("div");
  let watchDate = film.watchDate;
	divWatchDate.innerText = watchDate == null ? "" : watchDate.format("YYYY-MM-DD");
  div.appendChild(divWatchDate);

	// TODO Favorite in number of stars
	const divRating = document.createElement("div");
	divRating.innerText = film.rating;
	div.appendChild(divRating);

  const divActions = document.createElement("div");
	const buttonEdit = document.createElement("button");
	buttonEdit.classList.add("btn", "btn-primary", "mx-1");
	buttonEdit.innerHTML = "<i class='bi bi-pencil-square'></i>";
	divActions.appendChild(buttonEdit);

	const buttonDelete = document.createElement("button");
	buttonDelete.classList.add("btn", "btn-danger");
	buttonDelete.innerHTML = "<i class='bi bi-trash'></i>";
	divActions.appendChild(buttonDelete);

	buttonDelete.addEventListener("click", (event) => {
		console.log(event.currentTarget.parentElement.parentElement.id);
		li.remove();
	});
	div.appendChild(divActions);

	return li;
}

function fillFilmsList(films) {
	const filmList = document.getElementById("films-list");
	// console.log(filmList);
	/*
	 * After adding sorting operation, is necessary to clean the table before inserting ordered answers.
	 * This piece of code is useless when the application is started for the first time.
	 */

	/* Very simple approach used during lecture to clean the table; remove all the HTML content. It deletes also the row dedicated to inserting a new answer. */
	// answerTable.innerHTML = "";

	/* Cleaning the list for the sorting operation; inserting only the "new-answer-row" */
	filmList.innerHTML = "";

	for (const film of films) {
		const trAnswer = createFilmRow(film);
		filmList.prepend(trAnswer);
	}
}

function addSortListener(filmList) {}

document.addEventListener("DOMContentLoaded", function () {
	const filmLibrary = new FilmLibrary();
	filmLibrary.init();

	// console.log(filmLibrary.films);
  
	// fillFilmsList(filmLibrary.films);
	addSortListener(filmLibrary.films);
});
