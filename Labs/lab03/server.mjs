// import
import express from "express";
import morgan from "morgan";
import { check, validationResult } from "express-validator";
import {
  getFilms,
  getFavFilms,
  getBestFilms,
  getWatchedLastMonth,
  getNotWatched,
  getFilm,
  addFilm,
  updateFilm,
  deleteFilmById,
} from "./dao.mjs";

// app definition
const app = express();
const port = 3001;

// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));

// ROUTES
/****************/
/*     GET      */
/****************/

// get all films
app.get("/api/films", (request, response) => {
  getFilms()
    .then((films) => response.json(films))
    .catch(() => response.status(500).end());
});

// fav films
app.get("/api/films/favorites", (request, response) => {
  getFavFilms()
    .then((films) => response.json(films))
    .catch(() => response.status(500).end());
});

// best films
app.get("/api/films/best", (request, response) => {
  getBestFilms()
    .then((films) => response.json(films))
    .catch(() => response.status(500).end());
});

// watched last month
app.get("/api/films/last-month", (request, response) => {
  getWatchedLastMonth()
    .then((films) => response.json(films))
    .catch((err) => {
      console.log(err);
      response.status(500).end();
    });
});

// not watched
app.get("/api/films/not-watched", (request, response) => {
  getNotWatched()
    .then((films) => response.json(films))
    .catch(() => response.status(500).end());
});

// from id
app.get("/api/films/:id", async (req, res) => {
  try {
    const film = await getFilm(req.params.id);
    if (film.error) res.status(404).json(film);
    else res.json(film);
  } catch {
    res.status(500).end();
  }
});

/****************/
/*     POST     */
/****************/
//add new film in the db
app.post(
  "/api/films",
  [
    check("title").notEmpty().isString(),
    check("isFavorite").optional().isBoolean(),
    check("rating").optional().isIn([0, 1, 2, 3, 4, 5]),
    check("watchDate")
      .optional()
      .isDate({ format: "YYYY-MM-DD", strictMode: true }),
    check("userId").notEmpty().isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const newFilm = req.body;

    try {
      const id = await addFilm(newFilm);
      res.status(201).end();
    } catch (e) {
      console.error(`ERROR: ${e.message}`);
      res.status(503).json({ error: "Error adding the film." });
    }
  }
);

/****************/
/*     PUT      */
/****************/
// update film information
app.put(
  "/api/films/:id",
  [
    check("title").notEmpty().isString(),
    check("isFavorite").isBoolean(),
    check("rating").isIn([0, 1, 2, 3, 4, 5]),
    check("watchDate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
    check("userId").notEmpty().isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const filmToUpdate = req.body;
    filmToUpdate.id = req.params.id;

    try {
      await updateFilm(filmToUpdate);
      res.status(200).end();
    } catch {
      res
        .status(503)
        .json({ error: `Impossible to update film #${req.params.id}.` });
    }
  }
);

/****************/
/*   DELETE     */
/****************/
// remove film
app.delete("/api/films/:id", async (req, res) => {
  const filmId = req.params.id;

  try {
    const removedFilm = await deleteFilmById(filmId);
    res.status(200).json(removedFilm);
  } catch {
    res
      .status(503)
      .json({ error: `Impossible to remove film with id #${filmId}.` });
  }
});

// start server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
