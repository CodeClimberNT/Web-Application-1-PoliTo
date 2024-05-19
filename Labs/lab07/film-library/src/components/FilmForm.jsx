import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function FilmForm ({ film, addFilm, updateFilm, cancel, mode }) {
  const [formData, setFormData] = useState(film);

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "add") {
      addFilm(formData);
    } else if (mode === "edit") {
      updateFilm(formData);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Year</Form.Label>
        <Form.Control
          type="text"
          name="year"
          value={formData.year}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Director</Form.Label>
        <Form.Control
          type="text"
          name="director"
          value={formData.director}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Poster</Form.Label>
        <Form.Control
          type="text"
          name="poster"
          value={formData.poster}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {mode === "add" ? "Add" : "Update"}
      </Button>
      <Button
        variant="secondary"
        className="ms-2"
        onClick={() => {
          cancel();
        }}
      >
        Cancel
      </Button>
    </Form>
  );
}

export default FilmForm;