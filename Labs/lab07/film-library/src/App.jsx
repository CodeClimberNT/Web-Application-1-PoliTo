import "bootstrap/dist/css/bootstrap.min.css";
import NavHeader from "./components/NavHeader";
import Films from "./components/FilmsComponent";
import Filters from "./components/FiltersComponent";
import { Col, Container, Row } from "react-bootstrap";
import { FilmLibrary } from "./FilmModels.mjs";
import AddFilm from "./components/AddFilmComponent";
import dayjs from "dayjs";
import { useState } from "react";

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

	const filmLibrary = new FilmLibrary();
	filmLibrary.init();
	const [activeFilter, setActiveFilter] = useState(filters[0]);
	const [films, setFilms] = useState(filmLibrary.list);

	console.log(activeFilter);

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
				<AddFilm />
			</Container>
		</div>
	);
}

export default App;
