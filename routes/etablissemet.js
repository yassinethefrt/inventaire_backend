const express = require("express");
const router = express.Router();
const {
  getAll,
  getCount,
  getById,
  createEtablissement,
  updateEtablissement,
  deleteEtablissement,
} = require("../controllers/etablisement");
router.get("/etablissements", getCount, getAll);
router.get("/etablissements/:id", getById);
router.post("/etablissements", createEtablissement);
router.put("/etablissements/:id", updateEtablissement);
router.delete("/etablissements/:id", deleteEtablissement);

module.exports = router;
