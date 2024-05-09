import dayjs from "dayjs";

function Film(
	id,
	title,
	isFavorite = false,
	watchDate = null,
	rating = 0,
	userId = 1
) {
	this.id = id;
	this.title = title;
	this.favorite = isFavorite;
	this.rating = rating;
	// saved as dayjs object only if watchDate is truthy
	this.watchDate = watchDate && dayjs(watchDate);
	this.userId = userId;

	this.toString = () => {
		return (
			`Id: ${this.id}, ` +
			`Title: ${this.title}, Favorite: ${this.favorite}, ` +
			`Watch date: ${this.watchDate}, Score: ${this.rating}, ` +
			`User: ${this.userId}`
		);
	};
}

function FilmLibrary() {
	this.list = [];

	this.addNewFilm = (film) => {
		if (!this.list.some((f) => f.id == film.id)) this.list.push(film);
		else throw new Error("Duplicate id");
	};

	this.deleteFilm = (id) => {
		const newList = this.list.filter(function (film) {
			return film.id !== id;
		});
		this.list = newList;
	};

	this.resetWatchedFilms = () => {
		this.list.forEach((film) => delete film.watchDate);
	};

	this.getRated = () => {
		const newList = this.list.filter(function (film) {
			return film.rating > 0;
		});
		return newList;
	};

	this.sortByDate = () => {
		const newArray = [...this.list];
		newArray.sort((d1, d2) => {
			if (!d1.watchDate) return 1; // null/empty watchDate is the lower value
			if (!d2.watchDate) return -1;
			return d1.watchDate.diff(d2.watchDate, "day");
		});
		return newArray;
	};

	this.init = () => {
		this.list = [
			new Film(1, "Pulp Fiction", true, "March 10, 2024", 5),
			new Film(2, "21 Grams", true, "March 17, 2024", 4),
			new Film(3, "Star Wars", false),
			new Film(4, "Matrix", false),
			new Film(5, "Shrek", false, "March 21, 2024", 3),
		];
	};
}

export { Film, FilmLibrary };
