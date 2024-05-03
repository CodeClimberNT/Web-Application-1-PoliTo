import "bootstrap/dist/css/bootstrap.min.css";
import NavHeader from "./components/NavHeader";
import Films from "./components/FilmsComponent";
import Filters from "./components/FiltersComponent";
import { Col, Container, Row } from "react-bootstrap";
import { FilmLibrary } from "./FilmModels.mjs";

const filmLibrary = new FilmLibrary();
filmLibrary.init();

const films = filmLibrary.list;
const filters = { name: "All" };

console.log(films);

function App() {
	return (
		<>
			<NavHeader />
			<Container fluid >
				<Row>
					<Col md={3} className="bg-light pt-4">
						<Filters />
					</Col>
					<Col md={9} className="pt-3">
						<Films films={films} filters={filters} />
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default App;
