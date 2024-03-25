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
      this.favorites == 1 ? "yes" : "no"
    }, Watch date: ${
      this.watchDate ? this.watchDate.format("MMMM D, YYYY") : "tbw"
    }, Score: ${this.rating}, User: ${this.userId}`;
  };
}

function FilmLibrary() {
  // this.films = [];

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
  this.retrieveAllFilms = () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films";
      db.all(sql, (err, rows) => {
        if (err) {
          return reject(err);
        }

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

        return resolve(films);
      });
    });
  };

  this.retrieveFavFilms = () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE isFavorite=1";
      db.all(sql, (err, rows) => {
        if (err) {
          return reject(err);
        }

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

        return resolve(films);
      });
    });
  };

  this.retrieveWatchedToday = (debug = 0) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE watchDate=?";

      // for debug purpose, the actual date is in first line
      const when = !debug
        ? dayjs().format("YYYY-MM-DD")
        : dayjs("2024-03-10").format("YYYY-MM-DD");

      db.all(sql, [when], (err, rows) => {
        if (err) {
          return reject(err);
        }

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

        return resolve(films);
      });
    });
  };

  this.retrieveWatchedBeforeDate = (date) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE watchDate<?";

      const when = dayjs(date).format("YYYY-MM-DD");

      db.all(sql, [when], (err, rows) => {
        if (err) {
          return reject(err);
        }

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

        return resolve(films);
      });
    });
  };

  this.retrieveWithRatingOrBetter = (rating) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE rating>=?";

      db.all(sql, [rating], (err, rows) => {
        if (err) {
          return reject(err);
        }

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

        return resolve(films);
      });
    });
  };

  this.retrieveFromTitle = (strSearch) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE title LIKE ?";

      db.all(sql, [`%${strSearch}%`], (err, rows) => {
        if (err) {
          return reject(err);
        }

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

        return resolve(films);
      });
    });
  };

  this.toString = () => this.films.toString();
}

async function main() {
  const filmLibrary = new FilmLibrary();
  console.log(
    `****| All Films |****"${await filmLibrary.retrieveAllFilms()}\n`
  );

  console.log(
    `****| Favorite Films |****${await filmLibrary.retrieveFavFilms()}\n`
  );

  const watchedToday = await filmLibrary.retrieveWatchedToday();
  console.log(
    `****| Watched Today |**** ${
      watchedToday.length > 0 ? watchedToday : "\nNothing Watched Today"
    }\n`
  );

  const when = "2024-03-20";
  console.log(
    `****| Watched Before ${when} |****${await filmLibrary.retrieveWatchedBeforeDate(
      when
    )}\n`
  );

  const rating = 3;

  console.log(
    `****| With Rating >= of ${rating} |****${await filmLibrary.retrieveWithRatingOrBetter(
      rating
    )}\n`
  );

  const searchTerm = "21";
  console.log(
    `****| Have ${searchTerm} in the title |****${await filmLibrary.retrieveFromTitle(
      searchTerm
    )}`
  );
}

main();
