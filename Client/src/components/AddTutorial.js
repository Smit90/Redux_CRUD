import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTutorial } from "../redux/actions/tutorials";

const AddTutorial = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };

  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    const { title, description } = tutorial;

    dispatch(createTutorial(title, description))
      .then((data) => {
        if (data) {
          setTutorial({
            id: data.id,
            title: data.title,
            description: data.description,
            published: data.published,
          });
          setSubmitted(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Successfully Submitted</h4>
          <button onClick={newTutorial} className="btn btn-primary">
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              required
              name="title"
              id="title"
              value={tutorial.title}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              required
              name="description"
              id="description"
              value={tutorial.description}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <button onClick={saveTutorial} className="btn btn-outline-primary">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
