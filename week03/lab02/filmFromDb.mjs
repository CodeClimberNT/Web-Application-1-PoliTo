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

  this.addFilm = (film) => {
    return new Promise((resolve, reject) => {
      if (!film) {
        return reject("Argument is not a Film object!");
      }
      const sql =
        "INSERT INTO films (title, isFavorite, watchDate, rating, userId) VALUES (?, ?, ?, ?, ?)";

      db.run(
        sql,
        [
          film.title,
          film.isFavorite ? 1 : 0,
          film.watchDate,
          film.rating,
          film.userId,
        ],
        function (err) {
          if (err) {
            console.log("Error Inserting Film");
            return reject(err);
          }

          console.log("Operation Successful");
          return resolve(this.lastID);
        }
      );
    });
  };

  this.toString = () => this.films.toString();
}

async function main() {
  const filmLibrary = new FilmLibrary();

  //! FIRST PART OF THE LAB

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

  const searchTerm = "Imit";
  console.log(
    `****| Have ${searchTerm} in the title |****${await filmLibrary.retrieveFromTitle(
      searchTerm
    )}\n`
  );

  console.log("Second part of lab");
  //! SECOND PART OF THE LAB
  const imitGame = new Film(6, "Imitation Game", true, "2024-03-25", 5, 1);
  console.log(imitGame.toString());
  console.log(
    await filmLibrary
      .addFilm(imitGame)
      .then((id) => {
        console.log(`Film inserted with id: ${id}`);
      })
      .catch((err) => {
        console.error(`Error inserting film: ${err}`);
      })
  );
}

main();
