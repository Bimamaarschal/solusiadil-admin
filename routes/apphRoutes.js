const express = require("express");
const router = express.Router();
const apphController = require("../controllers/apphController");
const cekJWT = require("../middlewares/cekJWT");
const upload = require("../middlewares/upload");

router.get("/dataapph", cekJWT, apphController.getDataapph);
router.get("/tulisapph", cekJWT, apphController.getTulisapph);
router.get("/lihatapph", cekJWT, apphController.apphlihatData);
router.get("/bacaapph", cekJWT, apphController.apphbacaData);
router.get("/hapusapph", cekJWT, apphController.apphhapusData);
router.get("/editapph", cekJWT, apphController.appheditData);
router.post("/kirimapph", cekJWT, apphController.apphbaruData);
router.post("/updateapph", cekJWT, apphController.updateApphData);

module.exports = router;
