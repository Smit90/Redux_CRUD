const express = require("express");
const router = express.Router();
const {
  getall,
  getByID,
  create,
  update,
  remove,
  removeAll,
  byTitle,
} = require("../controller/tutorial");

router.get("/tutorials", getall);
router.get("/tutorial/:id", getByID);
router.post("/tutorials", create);
router.put("/tutorials/:id", update);
router.delete("/tutorials/:id", remove);
router.get("/tutorial", byTitle);
router.delete("/tutorials", removeAll);

module.exports = router;
