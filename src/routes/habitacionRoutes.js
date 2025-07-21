const express = require("express");
const router = express.Router();
const habitacionController = require("../controllers/habitacionControllers");

router.post("/crearHabitacion", habitacionController.crearHabitacion);
router.get("/obtenerHabitaciones", habitacionController.obtenerHabitaciones);
router.get("/obtenerHabitacionesConParticipantes", habitacionController.obtenerHabitacionesConParticipantes);
router.get("/obtenerHabitacion/:id", habitacionController.obtenerHabitacion);
router.delete("/eliminarHabitacion/:id", habitacionController.eliminarHabitacion);
router.put("/editarHabitacion", habitacionController.editarHabitacion);
router.get(
  "/obtenerParticipantesPorHabitacion/:idHabitacion",
  habitacionController.obtenerParticipantesPorHabitacion
);

module.exports = router;
