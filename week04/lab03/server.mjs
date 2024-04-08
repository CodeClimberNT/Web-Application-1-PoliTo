// import
import express from "express";
import morgan from "morgan";
import { check, validationResult } from "express-validator";
import {
  listFilms,
  listFavFilms,
  listBestFilms,
  listWatchedLastMonth,
  listNotWatched,
  getFilm,
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
  listFilms()
    .then((films) => response.json(films))
    .catch(() => response.status(500).end());
});

// fav films
app.get("/api/films/favorites", (request, response) => {
  listFavFilms()
    .then((films) => response.json(films))
    .catch(() => response.status(500).end());
});

// best films
app.get("/api/films/best", (request, response) => {
  listBestFilms()
    .then((films) => response.json(films))
    .catch(() => response.status(500).end());
});

// watched last month
app.get("/api/films/last-month", (request, response) => {
  listWatchedLastMonth()
    .then((films) => response.json(films))
    .catch((err) => {
      console.log(err);
      response.status(500).end();
    });
});

// not watched
app.get("/api/films/not-watched", (request, response) => {
  listNotWatched()
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
app.post("/api/films", [check("title").notEmpty()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const newFilm = req.body;
  try {
    const id = await addFilm(newFilm);
    
  } catch (e) {}
});

/****************/
/*     PUT      */
/****************/

// start server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
