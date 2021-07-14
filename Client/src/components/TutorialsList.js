import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveTutorials,
  findTutorialByTitle,
  deleteAllTutorials,
} from "../redux/actions/tutorials";
import { ThemeContext } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const TutorialsList = () => {
  const themeContext = useContext(ThemeContext);
  const { light, dark } = themeContext.themeDetails;
  const theme = themeContext.isLightTheme ? light : dark;

  const [size] = useState(4);
  const [skip, setSkip] = useState(0);

  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const tutorials = useSelector((state) => state.tutorials);
  // console.log("list-->>", tutorials);
  const dispatch = useDispatch();

  // console.log(tutorials.length);
  const pageCount = Math.ceil(tutorials.Length / size);


  useEffect(() => {
    dispatch(retrieveTutorials(skip, size));
  }, [dispatch, size, skip]);

  const handlePageChange = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * size;
    setSkip(offset);
    // console.log(selectedPage);
  };


  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const refreshData = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    dispatch(deleteAllTutorials())
      .then((response) => {
        console.log(response);
        refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findTutorialByTitle(searchTitle));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div
            className="input-group-append"
            style={{ color: theme.syntax, background: theme.bg }}
          >
            <button
              className="btn btn-outline-secondary"
              style={{ background: theme.ui }}
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
            <span
              className="badge badge-primary ml-2"
              onClick={themeContext.toggleTheme}
            >
              Toggle
            </span>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Tutorials List</h4>

        <ul className="list-group">
          {tutorials &&
            tutorials.result &&
            tutorials.result.map((tutorial, index) => (
              <li
                style={{ color: theme.syntax, background: theme.bg }}
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                {tutorial.title}
              </li>
            ))}
        </ul>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentTutorial ? (
          <div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTutorial.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTutorial.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTutorial.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/tutorials/" + currentTutorial.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"active"}
      ></ReactPaginate>
    </div>
  );
};

export default TutorialsList;
