/* eslint-disable react/prop-types */
import { Col, Row, Table, Button, Container } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

function Films(props) {
	return (
		<Container fluid>
			<Row>
				<Col as="h2" className="mb-0">
					{props.filterName}
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
			{/* <thead>
				<tr>
					<th>Title</th>
					<th>Favorite</th>
					<th>WatchDate</th>
					<th>Actions</th>
				</tr>
			</thead> */}
			<tbody>
				{props.films.map((film) => (
					<FilmRow film={film} key={film.id} />
				))}
			</tbody>
		</Table>
	);
}

function FilmRow(props) {
	return (
		<tr>
			<FilmData film={props.film} />
			<FilmAction film={props.film} />
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
		</>
	);
}

function FilmFavorite(props) {
	const [checked, setChecked] = useState(props.favorite);
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
						<i key={index} className="bi bi-star-fill text-warning"></i>
					))}
				{Array(5 - props.rating)
					.fill()
					.map((_, index) => (
						<i key={index} className="bi bi-star text-warning"></i>
					))}
			</>
		);
	}
}

function FilmAction(props) {
	console.debug("FilmAction", props);
	return (
		<td>
			<FilmRating rating={props.film.rating} />

			<Button variant="link" className="bi bi-pencil mx-1 text-dark" />
			<Button variant="link" className="bi bi-trash text-dark" />
		</td>
	);
}

export default Films;
