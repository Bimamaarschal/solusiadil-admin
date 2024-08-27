const express = require("express");
const router = express.Router();
const sertifikatController = require("../controllers/sertifikatController");
const cekJWT = require('../middlewares/cekJWT');
const upload  = require('../middlewares/upload');

router.get("/datasertifikat",  cekJWT, sertifikatController.getDatasertifikat);
router.get("/lihatprosessertifikat", cekJWT, sertifikatController.sertifikatlihatprosesData);
router.get("/lihatsertifikat", cekJWT, sertifikatController.sertifikatlihatData);
router.post("/kirimprosessertifikat", cekJWT, sertifikatController.sertifikatprosesData); 
router.get("/hapussertifikat", cekJWT, sertifikatController.sertifikathapusData);
router.get("/cetaksertifikat", cekJWT, sertifikatController.sertifikatCetak);

module.exports = router;
