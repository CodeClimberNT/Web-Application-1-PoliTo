import { Container, Col, Form, Navbar } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

function NavHeader() {
	return (
		<Navbar
			bg="primary"
			data-bs-theme="dark"
			className="navbar-expand-lg navbar-dark bg-primary mb-0"
		>
			<Container fluid>
				<Col md={3}>
					<Navbar.Brand className="mb-0" href="/">
						<i className="bi bi-collection-play"></i> Film Library
					</Navbar.Brand>
				</Col>
				<Col md={3}>
					<Form data-bs-theme="light">
						<Form.FloatingLabel controlId="searchInput" label="Search">
							<Form.Control
								type="search"
								placeholder="Search"
								aria-label="Search"
							/>
						</Form.FloatingLabel>
					</Form>
				</Col>
				<Col md={5} className="text-end fs-2 lh-1">
					<Navbar.Text>
						<a href="#" className="link-light text-decoration-none">
							<i className="bi bi-person-circle"></i>
						</a>
					</Navbar.Text>
				</Col>
			</Container>
		</Navbar>
	);
}

export default NavHeader;
