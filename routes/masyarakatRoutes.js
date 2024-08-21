const express = require("express");
const router = express.Router();
const masyarakatController = require("../controllers/masyarakatController");
const cekJWT = require("../middlewares/cekJWT");
const upload = require("../middlewares/upload");

router.get("/datamasyarakat", cekJWT, masyarakatController.getDatamasyarakat);
router.get("/tulismasyarakat", cekJWT, masyarakatController.getTulismasyarakat);
router.get("/lihatmasyarakat", cekJWT, masyarakatController.masyarakatlihatData);
router.get("/bacamasyarakat", cekJWT, masyarakatController.masyarakatbacaData);
router.get("/hapusmasyarakat", cekJWT, masyarakatController.masyarakathapusData);
router.get("/editmasyarakat", cekJWT, masyarakatController.masyarakateditData);
router.post("/updatemasyarakat", cekJWT, masyarakatController.updatemasyarakatData);

module.exports = router;
