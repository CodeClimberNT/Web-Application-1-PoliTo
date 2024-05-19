import { Button } from "react-bootstrap";

import "../App.css";

function AddFilm() {
	return (
		<Button variant="primary" className="rounded-circle fixed-right-bottom">
			<i className="bi bi-plus"></i>
		</Button>
	);
}

export default AddFilm;
