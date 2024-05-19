import "bootstrap/dist/css/bootstrap.min.css";
import NavHeader from "./components/NavHeader";
import Films from "./components/FilmsComponent";
import Filters from "./components/FiltersComponent";
import { Col, Container, Row, Button } from "react-bootstrap";
import { FilmLibrary } from "./FilmModels.mjs";
import dayjs from "dayjs";
import { useState } from "react";
import "./App.css";

const filmLibrary = new FilmLibrary();
filmLibrary.init();

function App() {
	const filters = [
		{ label: "All", name: "all", filterAction: () => true },
		{
			label: "Favorites",
			name: "Favorites",
			filterAction: (film) => film.favorite,
		},
		{
			label: "Best Rated",
			name: "bestRated",
			filterAction: (film) => film.rating === 5,
		},
		{
			label: "Seen Last Month",
			name: "recentlyWatched",
			filterAction: (film) =>
				film.watchDate && film.watchDate.isAfter(dayjs().subtract(1, "months")),
		},
		{
			label: "Unseen",
			name: "unseen",
			filterAction: (film) => !film.watchDate,
		},
	];

	const [activeFilter, setActiveFilter] = useState(filters[0]);
	const [films, setFilms] = useState(filmLibrary.list);

	const [mode, setMode] = useState("view");
	const [editableFilm, setEditableFilm] = useState();

	const handleEdit = (film) => {
		setEditableFilm(film);
		setMode("edit");
	};

	const updateFilm = (film) => {
		setFilms((oldFilms) => {
			const newFilms = oldFilms.map((f) => {
				if (f.id === film.id) {
					return film;
				}
				return f;
			});
			return newFilms;
		});
	};

	const addFilm = (film) => {
		setFilms((oldFilms) => {
			const newId = Math.max(...oldFilms.map((f) => f.id)) + 1;
			const newFilm = { ...film, id: newId };
			return [...oldFilms, newFilm];
		});
	};

	console.debug(activeFilter);

	const applyFilter = (filter) => {
		setFilms(filmLibrary.list.filter(filter.filterAction));
		setActiveFilter(filter);
	};

	return (
		<div className="min-vh-100 d-flex flex-column">
			<NavHeader />
			<Container fluid className="flex-grow-1 d-flex flex-column">
				<Row>
					<Col md={3} className="bg-light pt-4">
						<Filters filters={filters} applyFilter={applyFilter} />
					</Col>
					<Col md={9}>
						<Col className="pt-3">
							<Films films={films} filterName={activeFilter.label} />
						</Col>
					</Col>
				</Row>
				{mode === "view" && (
					<Button
						variant="primary"
						className="rounded-circle fixed-right-bottom"
						onClick={() => {
							setMode("add");
						}}
					>
						<i className="bi bi-plus"></i>
					</Button>
				)}
				{mode === "add" && (
					<FilmForm
						addFilm={(film) => {
							addFilm(film);
							setMode("view");
						}}
						cancel={() => setMode("view")}
						mode={mode}
					/>
				)}

				{mode === "edit" && (
					<FilmForm
						key={editableFilm.id}
						film={editableFilm}
						updateFilm={(film) => {
							updateFilm(film);
							setMode("view");
						}}
						cancel={() => setMode("view")}
						mode={mode}
					/>
				)}
			</Container>
		</div>
	);
}

export default App;
