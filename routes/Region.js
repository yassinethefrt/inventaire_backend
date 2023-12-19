const express = require("express");
const router = express.Router();
const { getCount, getVilles, getById } = require("../controllers/Region");
router.get("/Regions", getCount, getVilles);
router.get("/Regions/:id", getById);
// router.post("/villes", createVilles);
// router.put("/villes/:id", updateVille);
// router.delete("/villes/:id", deleteVille);

module.exports = router;
