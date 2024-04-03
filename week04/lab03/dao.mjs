// DAO module for accessing film Library

import sqlite from "sqlite3";
import dayjs from "dayjs";
import { Film } from "./FilmModels.mjs";

// open db
const db = new sqlite.Database("films.db", (err) => {
  if (err) throw err;
});

// get all the films
export const listFilms = () => {
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

// get fav films
export const listFavFilms = () => {
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

// get bests films
export const listBestFilms = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM films WHERE rating=5";
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

// get watched last month
export const listWatchedLastMonth = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM films WHERE watchDate >= ?";

    // create a dayjs object for today and subtract a month
    const lastMonthDate = dayjs()
      .subtract(1, "month")
      .startOf("month")
      .format("YYYY-MM-DD");

    db.all(sql, [lastMonthDate], (err, rows) => {
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

// get watched last month
export const listNotWatched = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM films WHERE watchDate IS NULL";

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


export const getFilm = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM films WHERE id=?";

    db.get(sql, [id], (err, row) => {
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

export const addFilm = (film) => {
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
        film.watchDate.format("YYYY-MM-DD"),
        film.rating,
        film.userId,
      ],
      function (err) {
        if (err) {
          return reject(`Error Inserting Film: ${err}`);
        }

        return resolve(
          `Successfully added film "${film.title}" with id: ${this.lastID}`
        );
      }
    );
  });
};

export const removeFilmById = (id) => {
  return new Promise((resolve, reject) => {
    if (typeof id !== "string" && typeof id !== "number") {
      return reject("Argument is not a Film object!");
    }
    const sql = "DELETE FROM films WHERE id = ?";

    db.run(sql, [id], function (err) {
      if (err) {
        return reject(`Error with id: ${id}`);
      }
      if (this.changes === 0) {
        return reject(`No film found with id: ${id}`);
      }
      return resolve(`Successfully removed film with id ${id}`);
    });
  });
};
