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
			<Container fluid className="mt-3">
				<Row>
					<Col md={2} bg="dark">
						<Filters />
					</Col>
					<Col>
						<Films films={films} filters={filters} />
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default App;
