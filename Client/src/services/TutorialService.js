import http from "../http-common";

const getAll = (pageNo, size) => {
  return http.get(`/tutorials?pageNo=${pageNo}&size=${size}`);
};

const get = (id) => {
  return http.get(`/tutorial/${id}`);
};

const create = (data) => {
  return http.post("/tutorials", data);
};

const update = (id, data) => {
  return http.put(`/tutorials/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/tutorials/${id}`);
};

const removeAll = () => {
  return http.delete("/tutorials");
};

const findByTitle = (title) => {
  return http.get(`/tutorial?title=${title}`);
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default TutorialService;
