import dayjs from "dayjs";
import sqlite from "sqlite3";

const db = new sqlite.Database("films.db", (err) => {
  if (err) throw err;
});

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
  this.favorites = isFavorite;
  this.rating = rating;
  // saved as dayjs object only if watchDate is truthy
  this.watchDate = watchDate && dayjs(watchDate);
  this.userId = userId;

  this.toString = () => {
    return `\nId: ${this.id}, Title: ${this.title}, Favorite: ${
      this.favorites == 1 ? 'yes' : 'no'
    }, Watch date: ${
      this.watchDate ? this.watchDate.format("MMMM D, YYYY") : 'tbw'
    }, Score: ${this.rating}, User: ${this.userId}`;
  };
}

function FilmLibrary() {
  this.films = [];

  /*
  this.addNewFilm = (film) => {
    if (!this.list.some((f) => f.id == film.id)) this.list.push(film);
    else throw new Error("Duplicate id");
  };

  this.deleteFilm = (id) => {
    const newList = this.list.filter(function (film, index, arr) {
      return film.id !== id;
    });
    this.list = newList;
  };

  this.resetWatchedFilms = () => {
    this.list.forEach((film) => delete film.watchDate);
  };

  this.getRated = () => {
    const newList = this.list.filter(function (film, index, arr) {
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
*/
  this.retrieveDB = () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films";
      db.all(sql, (err, rows) => {
        if (err) reject(err);
        else {
          const films = rows.map(
            (row) =>
              new Film(
                row.id,
                row.title,
                row.isFavorite,
                row.watchDate,
                row.rating,
                row.userId
              )
          );
          this.films = [...films];
          resolve(films);
        }
      });
    });
  };

  this.toString = () => this.films.toString();
}

async function main() {
  const filmLibrary = new FilmLibrary();
  const films = await filmLibrary.retrieveDB();
  console.log("" + films);
}

main();
