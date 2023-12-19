const express = require("express");
const router = express.Router();
const {
  getCount,
  getAll,
  getById,
  createGenreMateriel,
  updateGenreMateriel,
  deleteMateriel,
} = require("../controllers/genreMateriel");
router.get("/genreMateriel", getCount, getAll);
router.get("/genreMateriel/:id", getById);
router.post("/genreMateriel", createGenreMateriel);
router.put("/genreMateriel/:id", updateGenreMateriel);
router.delete("/genreMateriel/:id", deleteMateriel);

module.exports = router;
