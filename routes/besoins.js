const express = require("express");
const router = express.Router();
const {
  getCount,
  getAll,
  getById,
  createBesoin,
  updateBesoin,
  deleteBesoin,
} = require("../controllers/besoins");
router.get("/besoins", getCount, getAll);
router.get("/besoins/:id", getById);
router.post("/besoins", createBesoin);
router.put("/besoins/:id", updateBesoin);
router.delete("/besoins/:id", deleteBesoin);

module.exports = router;
