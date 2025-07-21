const express = require("express");
const router = express.Router();
const maestrasController = require("../controllers/maestrasControllers");

router.post("/estaca/crearEstaca", maestrasController.crearEstaca);
router.get("/estaca/obtenerEstacas", maestrasController.obtenerEstacas);
router.get("/estaca/obtenerEstaca/:id", maestrasController.obtenerEstaca);
router.delete("/eestaca/liminarEstaca/:id", maestrasController.eliminarEstaca);
router.put("/estaca/editarEstaca", maestrasController.editarEstaca);


module.exports = router;
