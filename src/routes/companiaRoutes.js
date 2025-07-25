const express = require("express");
const router = express.Router();
const companiaController = require("../controllers/companiaControllers");

router.post("/crearCompania", companiaController.crearCompania);
router.put("/editarCompania", companiaController.editarCompania);
router.get("/obtenerCompanias", companiaController.obtenerCompanias);
router.get("/obtenerCompania/:id", companiaController.obtenerCompania);
router.delete("/eliminarCompania/:id", companiaController.eliminarCompania);
router.get(
  "/obtenerCompaniasConParticipantes",
  companiaController.obtenerCompaniasConParticipantes
);
router.get(
  "/obtenerParticipantesPorNumeroCompania/:idCompania",
  companiaController.obtenerParticipantesPorNumeroCompania
);
router.get(
  "/obtenerParticipantesNumeroCompania/:numCompania",
  companiaController.obtenerParticipantesNumeroCompania
);
router.get(
  "/obtenerParticipantesPorEdadPorCompania/:idCompania",
  companiaController.obtenerParticipantesPorEdadPorCompania
);

module.exports = router;
