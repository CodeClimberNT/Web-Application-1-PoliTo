import dayjs from "dayjs";

function Film(
  id,
  title,
  favorites = false,
  date = null,
  rating = 0,
  userid = 1
) {
  this.id = id;
  this.title = title;
  this.favorites = favorites;
  this.date = dayjs(date);
  this.rating = rating;
  this.userid = userid;

  this.toString = () => {
    return `\nId: ${this.id}, Title: ${this.title}, Favorite: ${
      this.favorites
    }, Watch date: ${this.date.format("MMMM D, YYYY")}, Score: ${
      this.rating
    }, User: ${this.userid}`;
  };
}

function FilmLibrary() {
  this.films = [];

  this.addNewFilm = (film) => this.films.push(film);

  this.sortByDate = () => [...this.films].sort((a, b)=> a.date.isAfter(b.date) ? 1 : -1).reverse();

  this.deleteFilm = (id) => {
    const toRemove = this.films.find(film => film.id === id)
    const index = this.films.indexOf(toRemove);
    if(index > -1)
      this.films.splice(index, 1);
  
  }

  this.resetWatchedFilms = () => {
    for(const film of this.films)
      film.date = dayjs(null);
    
  }

  this.getRated = () => [...this.films].filter((film)=> film.rating > 0)

  this.toString = () => this.films.toString();
}

/*
Id: 1, Title: Pulp Fiction, Favorite: true, Watch date: March 10, 2024, Score: 5, User: 1 
Id: 2, Title: 21 Grams, Favorite: true, Watch date: March 17, 2024, Score: 4, User: 1 
Id: 3, Title: Star Wars, Favorite: false, Watch date: null, Score: 0, User: 1 
Id: 4, Title: Matrix, Favorite: false, Watch date: null, Score: 0, User: 1 
Id: 5, Title: Shrek, Favorite: false, Watch date: March 21, 2024, Score: 3, User: 1
*/

const film1 = new Film(1, "Pulp Fiction", true, "March 10, 2024", 5);
const film2 = new Film(2, "21 Grams", true, "March 17, 2024", 4);
const film3 = new Film(3, "Star Wars", false);
const film4 = new Film(4, "Matrix", false);
const film5 = new Film(5, "Shrek", false, "March 21, 2024", 3);

const filmLibrary = new FilmLibrary();
filmLibrary.addNewFilm(film1);
filmLibrary.addNewFilm(film2);
filmLibrary.addNewFilm(film3);
filmLibrary.addNewFilm(film4);
filmLibrary.addNewFilm(film5);

console.log("\n\nFilm Library: ");
console.log("" + filmLibrary);

console.log("\n\nFilm Library sorted by Date: ");
console.log("" + filmLibrary.sortByDate());

/*
console.log("\n\nFilm Library without id 2: ");
filmLibrary.deleteFilm(2);
console.log("" + filmLibrary);
*/

/*
console.log("\n\nReset Film Library date: ");
filmLibrary.resetWatchedFilms();
console.log("" + filmLibrary);
*/

console.log("\n\nFilms filtered, only the rated ones: ");
console.log("" + filmLibrary.getRated());