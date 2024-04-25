"use strict";

function createFilmRow(film) {
	const li = document.createElement("li");
	li.classList.add("list-group-item");
	li.setAttribute("id", `film-${film.id}-wrapper`);

	const div = document.createElement("div");
	div.setAttribute("id", `film-${film.id}`);
	div.classList.add("row", "gy-2");
	li.appendChild(div);

	const divTitle = document.createElement("div");
	divTitle.classList.add(
		"col-6",
		"col-xl-3",
		"favorite-title",
		"d-flex",
		"gap-2",
		"align-items-center"
	);
	divTitle.innerText = film.title;
	div.appendChild(divTitle);

	// actions for small screen
	const divActionsSmallScreenWrapper = document.createElement("div");
	divActionsSmallScreenWrapper.classList.add("d-xl-none", "actions");

	const iSmallScreenEdit = document.createElement("i");
	iSmallScreenEdit.classList.add("bi", "bi-pencil");
	divActionsSmallScreenWrapper.appendChild(iSmallScreenEdit);

	const iSmallScreenDelete = document.createElement("i");
	iSmallScreenDelete.classList.add("bi", "bi-trash");
	divActionsSmallScreenWrapper.appendChild(iSmallScreenDelete);

	iSmallScreenDelete.addEventListener("click", (event) => {
		console.log(
			event.currentTarget.parentElement.parentElement.parentElement
				.parentElement.id
		);
		li.remove();
	});

	divTitle.appendChild(divActionsSmallScreenWrapper);

	// Div wrapper for favorite button
	const divFavoriteWrapper = document.createElement("div");
	divFavoriteWrapper.classList.add(
		"col-6",
		"col-xl-3",
		"text-end",
		"text-xl-center"
	);

	const spanCustomControlFavorite = document.createElement("span");
	spanCustomControlFavorite.classList.add("custom-control", "custom-checkbox");
	divFavoriteWrapper.appendChild(spanCustomControlFavorite);

	const inputFavorite = document.createElement("input");
	inputFavorite.setAttribute("type", "checkbox");
	inputFavorite.classList.add("custom-control-input");
	inputFavorite.setAttribute("id", `films[${film.id}][favorite]`);
	if (film.favorite) {
		inputFavorite.setAttribute("checked", "checked");
	}
	divFavoriteWrapper.appendChild(inputFavorite);

	spanCustomControlFavorite.appendChild(inputFavorite);

	div.appendChild(divFavoriteWrapper);
	// Watch Date

	const divWatchDate = document.createElement("div");
	divWatchDate.classList.add("col-4", "col-xl-3", "text-xl-center");
	let watchDate = film.watchDate;
	divWatchDate.innerText =
		watchDate == null ? "" : watchDate.format("YYYY-MM-DD");
	div.appendChild(divWatchDate);

	// Container for stars and Buttons
	const divActionContainer = document.createElement("div");
	divActionContainer.classList.add(
		"actions-container",
		"col-8",
		"col-xl-3",
		"text-end"
	);

	// Stars
	const divRating = document.createElement("div");
	for (let i = 0; i < film.rating; i++) {
		const star = document.createElement("i");
		star.classList.add("bi", "bi-star-fill");
		divRating.appendChild(star);
	}
	for (let i = 0; i < 5 - film.rating; i++) {
		const star = document.createElement("i");
		star.classList.add("bi", "bi-star");
		divRating.appendChild(star);
	}
	divActionContainer.appendChild(divRating);

	// Buttons
	const divActions = document.createElement("div");
	divActions.classList.add("d-none", "d-xl-flex", "actions");

	// Edit film
	const iEdit = document.createElement("i");
	iEdit.classList.add("bi", "bi-pencil");
	divActions.appendChild(iEdit);

	// Remove Film
	const iDelete = document.createElement("i");
	iDelete.classList.add("bi", "bi-trash");
	divActions.appendChild(iDelete);

	iDelete.addEventListener("click", (event) => {
		console.log(
			event.currentTarget.parentElement.parentElement.parentElement
				.parentElement.id
		);
		li.remove();
	});

	divActionContainer.appendChild(divActions);

	div.appendChild(divActionContainer);
	return li;
}

function fillFilmsList(films) {
	const filmList = document.getElementById("films-list");
	// console.log(filmList);

	/* Cleaning the list for the sorting operation; inserting only the "new-answer-row" */
	filmList.innerHTML = "";

	for (const film of films) {
		const liFilm = createFilmRow(film);
		filmList.prepend(liFilm);
	}
}

function addFilterListener(films) {
	const filtersContainerFilms = document.querySelector("#films-filters div ul");
	console.log(filtersContainerFilms);
	// add event listener to each filter
	// const {allFilter, favoriteFilter, bestRatedFilter, seenLastMonthFilter, unseenFilter} = filtersContainerFilms.querySelectorAll("li");
	const filters = filtersContainerFilms.querySelectorAll("li");
	console.log(filters)
	
}

document.addEventListener("DOMContentLoaded", function () {
	const filmLibrary = new FilmLibrary();
	filmLibrary.init();

	// console.log(filmLibrary.films);

	fillFilmsList(filmLibrary.films);
	addFilterListener(filmLibrary.films);
});
