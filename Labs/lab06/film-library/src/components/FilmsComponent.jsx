/* eslint-disable react/prop-types */
import { Col, Row, Table, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

function Films(props) {
	return (
		<>
			<Row>
				<Col as="h2">{props.filters.name}</Col>
			</Row>
			<Row>
				<Col lg={10} className="mx-auto">
					<FilmTable films={props.films}></FilmTable>
				</Col>
			</Row>
		</>
	);
}

function FilmTable(props) {
	return (
		<Table striped>
			<thead>
				<tr>
					<th>Title</th>
					<th>Favorite</th>
					<th>WatchDate</th>
					<th>Rating</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{props.films.map((film) => (
					<FilmRow film={film} key={film.id}></FilmRow>
				))}
			</tbody>
		</Table>
	);
}

function FilmRow(props) {
	return (
		<tr>
			<FilmData film={props.film}></FilmData>
			<FilmAction filmId={props.film.id}></FilmAction>
		</tr>
	);
}

function FilmData(props) {
	let watchDate = props.film.watchDate && props.film.watchDate.format("MMM D, YYYY");

	return (
		<>
			<td>{props.film.title}</td>
			<td>{props.film.favorite ? "Yes" : "No"}</td>
			<td>{watchDate}</td>
			<td>{props.film.rating}</td>
		</>
	);
}

function FilmAction(props) {
	return (
		<td>
			<Button variant="warning" className="mx-1">
				<i className="bi bi-pencil"></i>
			</Button>
			<Button variant="danger">
				<i className="bi bi-trash"></i>
			</Button>
		</td>
	);
}

export default Films;
