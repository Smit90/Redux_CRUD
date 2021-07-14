import {
  CREATE_TUTORIAL,
  RETRIEVE_TUTORIALS,
  RETRIEVE_BY_TITLE,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL,
  DELETE_ALL_TUTORIALS,
} from "./types";
// import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import TutorialService from "../../services/TutorialService";

export const createTutorial = (title, description) => async (dispatch) => {
  try {
    const res = await TutorialService.create({ title, description });
    // console.log(res);
    dispatch({
      type: CREATE_TUTORIAL,
      playload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (error) {
    console.log("inside catch block");
    return Promise.reject(error);
  }
};

// export const retrieveTutorials = (pageNo, size) => async (dispatch) => {
//   try {
//     const res = await TutorialService.getAll(pageNo, size);
//     dispatch({
//       type: RETRIEVE_TUTORIALS,
//       playload: res.data,
//     });
//     return Promise.resolve(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const retrieveTutorials = (skip, size) => async (dispatch) => {
  try {
    const res = await TutorialService.getAll();
    const data = res.data.result;
    const dataLength = data.length;
    const sliceData = data.slice(skip, skip + size);
    // console.log(sliceData)
    dispatch({
      type: RETRIEVE_TUTORIALS,
      playload: {sliceData,dataLength},
      // dataLength:dataLength 
    });
    return Promise.resolve(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const updateTutorial = (id, data) => async (dispatch) => {
  try {
    const res = await TutorialService.update(id, data);
    dispatch({
      type: UPDATE_TUTORIAL,
      playload: data,
    });
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteTutorial = (id) => async (dispatch) => {
  try {
    await TutorialService.remove(id);
    dispatch({
      type: DELETE_TUTORIAL,
      playload: { id },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllTutorials = () => async (dispatch) => {
  try {
    const res = await TutorialService.removeAll();
    dispatch({
      type: DELETE_ALL_TUTORIALS,
      playload: res.data,
    });
    Promise.resolve(res.data);
  } catch (error) {
    Promise.reject(error);
  }
};

export const findTutorialByTitle = (title) => async (dispatch) => {
  try {
    const res = await TutorialService.findByTitle(title);
    console.log(res);
    dispatch({
      type: RETRIEVE_BY_TITLE,
      playload: res.data,
    });
    Promise.resolve(res.data);
  } catch (error) {
    console.log(error);
  }
};

// function* mySaga() {
//   yield takeEvery("RETRIEVE_TUTORIALS", retrieveTutorials);
//   console.log(takeEvery("RETRIEVE_TUTORIALS", retrieveTutorials));
// }

// function* mySaga() {
//   yield takeLatest("RETRIEVE_TUTORIALS", retrieveTutorials);
//   console.log(takeLatest("RETRIEVE_TUTORIALS", retrieveTutorials));
// }

// export default mySaga;
