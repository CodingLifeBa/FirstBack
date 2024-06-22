const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const meshotelsCtrl = require("../controllers/meshotels");

router.get("/", meshotelsCtrl.getAllHotel);
router.post("/", multer, meshotelsCtrl.createHotel);
router.get("/:id", meshotelsCtrl.getOneHotel);
router.put("/:id", meshotelsCtrl.modifyHotel);
router.delete("/:id", meshotelsCtrl.deleteHotel);

module.exports = router;
