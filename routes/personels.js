const express = require("express");
const router = express.Router();
const {
  getCount,
  getById,
  getAll,
  createPersonel,
  updatePersonel,
  deletePersonel,
  getPersonnelChart,
  getPersonnelsData,
} = require("../controllers/personels");

router.get("/personnels", getCount, getAll);
router.get("/personnels/:id", getById);
router.post("/personnels", createPersonel);
router.put("/personnels/:id", updatePersonel);
router.delete("/personnels/:id", deletePersonel);
router.get("/personnelChart", getPersonnelChart);
router.get("/personnelData", getPersonnelsData);

module.exports = router;
