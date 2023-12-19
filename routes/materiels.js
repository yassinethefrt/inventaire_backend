const express = require("express");
const router = express.Router();
const {
  getAll,
  getCount,
  getById,
  createMateriel,
  updateMateriel,
  deleteMateriel,
  getMaterielChart,
} = require("../controllers/materiels");
router.get("/materiels", getCount, getAll);
router.get("/materiels/:id", getById);
router.get("/materielChart", getMaterielChart);
router.post("/materiels", createMateriel);
router.put("/materiels/:id", updateMateriel);
router.delete("/materiels/:id", deleteMateriel);

module.exports = router;
