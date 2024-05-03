/* eslint-disable react/prop-types */
import { Col, Row, Table, Button, Container } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

function Films(props) {
	return (
		<Container fluid>
			<Row>
				<Col as="h2" className="mb-0">
					{props.filters.name}
				</Col>
			</Row>
			<Row>
				<Col>
					<FilmTable films={props.films}></FilmTable>
				</Col>
			</Row>
		</Container>
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
	const watchDate =
		props.film.watchDate && props.film.watchDate.format("MMM D, YYYY");

	return (
		<>
			<td>{props.film.title}</td>
			<td>
				<FilmFavorite favorite={props.film.favorite} />
			</td>
			<td>{watchDate}</td>

			<td>
				<FilmRating rating={props.film.rating} />
			</td>
		</>
	);
}

function FilmFavorite(props) {
	const [checked, setChecked] = useState(props.favorite);
	// return <td>{props.favorite ? "Yes" : "No"}</td>;
	return (
		<label>
			<input
				type="checkbox"
				checked={checked}
				onChange={(e) => setChecked(e.currentTarget.checked)}
			/>{" "}
			Favorite
		</label>
	);
}

function FilmRating(props) {
	// return props.rating;
	const maxRating = 5;
	for (let i = 0; i < maxRating; i++) {
		return (
			<>
				{Array(props.rating)
					.fill()
					.map((_, index) => (
						<i key={index} className="bi bi-star-fill"></i>
					))}
				{Array(5 - props.rating)
					.fill()
					.map((_, index) => (
						<i key={index} className="bi bi-star"></i>
					))}
			</>
		);
	}
}

function FilmAction(props) {
	console.debug("FilmAction", props);
	return (
		<td>
			<Button variant="link" className="bi bi-pencil mx-1" />
			<Button variant="link" className="bi bi-trash" />
		</td>
	);
}

export default Films;
