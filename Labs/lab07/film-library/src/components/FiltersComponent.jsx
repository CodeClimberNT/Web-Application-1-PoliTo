/* eslint-disable react/prop-types */
import { Col, Row, Nav } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

function Filters(props) {

	return (
		<Row className="flex-grow-1">
			<Col className="d-md-block">
				<Nav
					variant="pills"
					className="flex-column gap-2 mb-auto"
					defaultActiveKey="#all"
				>
					{props.filters.map((filter) => (
						<FilterRow
							key={filter.name}
							filter={filter}
							applyFilter={props.applyFilter}
						/>
					))}
				</Nav>
			</Col>
		</Row>
	);
}

function FilterRow(props) {
	const { filter, applyFilter } = props;

	return (
		<Nav.Item>
			<Nav.Link
				href={`#${filter.name}`}
				className="link-dark"
				onClick={() => applyFilter(filter)}
			>
				{filter.label}
			</Nav.Link>
		</Nav.Item>
	);
}

// function FiltersPills() {
// 	return (
// 		<Nav
// 			variant="pills"
// 			className="flex-column gap-2 mb-auto"
// 			defaultActiveKey="#all"
// 		>
// 			<Nav.Item>
// 				<Nav.Link href="#all" className="link-dark">
// 					All
// 				</Nav.Link>
// 			</Nav.Item>
// 			<Nav.Item>
// 				<Nav.Link href="#favorites" className="link-dark">
// 					Favorites
// 				</Nav.Link>
// 			</Nav.Item>
// 			<Nav.Item>
// 				<Nav.Link href="#best" className="link-dark">
// 					Best Rated
// 				</Nav.Link>
// 			</Nav.Item>
// 			<Nav.Item>
// 				<Nav.Link href="#lastSeen" className="link-dark">
// 					Seen Last Month
// 				</Nav.Link>
// 			</Nav.Item>
// 			<Nav.Item>
// 				<Nav.Link href="#unseen" className="link-dark">
// 					Unseen
// 				</Nav.Link>
// 			</Nav.Item>
// 		</Nav>
// 	);
// }

export default Filters;
