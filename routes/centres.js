const express = require("express");
const router = express.Router();
const {
  getAll,
  getCount,
  getById,
  createCentre,
  updateCentre,
  deleteCentre,
} = require("../controllers/centres");
router.get("/centres", getCount, getAll);
router.get("/centres/:id", getById);
router.post("/centres", createCentre);
router.put("/centres/:id", updateCentre);
router.delete("/centres/:id", deleteCentre);

module.exports = router;
