import {
  CREATE_TUTORIAL,
  RETRIEVE_TUTORIALS,
  RETRIEVE_BY_TITLE,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL,
  DELETE_ALL_TUTORIALS,
} from "../actions/types";

const initialState = [];


const tutorialReducer = (tutorials = initialState, action) => {
  const { type, playload } = action;
  switch (type) {
    case CREATE_TUTORIAL:
      return [...tutorials, playload];

    case RETRIEVE_TUTORIALS:
      // console.log(playload);
      const result = [...playload.sliceData]
      const Length = playload.dataLength
      return {result,Length};

    case RETRIEVE_BY_TITLE:
      return [...playload.result];

    case UPDATE_TUTORIAL:
      return tutorials.map((tutorial) => {
        if (tutorial.id === playload.id) {
          return {
            ...tutorial,
            ...playload,
          };
        } else {
          return tutorial;
        }
      });

    case DELETE_TUTORIAL:
      return tutorials.filter(({ id }) => id !== playload.id);

    case DELETE_ALL_TUTORIALS:
      return [];

    default:
      return tutorials;
  }
};

export default tutorialReducer;
