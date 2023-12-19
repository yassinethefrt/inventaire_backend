const express = require("express");
const router = express.Router();
const {
  getById,
  getAll,
  getCount,
  createEquipement,
  updateEquipement,
  deleteEquipement,
  getEquipementData,
} = require("../controllers/equipements");
router.get("/equipements", getCount, getAll);
router.get("/equipements/:id", getById);
router.get("/equipementsData", getEquipementData);
router.post("/equipements", createEquipement);
router.put("/equipements/:id", updateEquipement);
router.delete("/equipements/:id", deleteEquipement);

module.exports = router;
