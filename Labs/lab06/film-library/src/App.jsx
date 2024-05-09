import "bootstrap/dist/css/bootstrap.min.css";
import NavHeader from "./components/NavHeader";
import Films from "./components/FilmsComponent";
import Filters from "./components/FiltersComponent";
import { Col, Container, Row } from "react-bootstrap";
import { FilmLibrary } from "./FilmModels.mjs";
import AddFilm from "./components/AddFilmComponent";

const filmLibrary = new FilmLibrary();
filmLibrary.init();

const films = filmLibrary.list;
const filters = { name: "All" };

console.log(films);

function App() {
	return (
		<>
			<NavHeader />
			<Container fluid>
				<Row>
					<Col md={3} className="bg-light pt-4 min-vh-100">
						<Filters />
					</Col>
					<Col md={9}>
						<Row>
							<Col className="pt-3">
								<Films films={films} filters={filters} />
							</Col>
						</Row>
						<Row>
							<Col className="fixed-bottom me-3 mb-4">
								<AddFilm />
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default App;
