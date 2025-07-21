const express = require('express');
const router = express.Router();
const participanteController = require('../controllers/participanteControllers');
const upload = require('../utils/upload');

router.post('/crearParticipante', participanteController.crearParticipante);
router.post('/editarParticipante', participanteController.editarParticipante);
router.get('/obtenerParticipante/:id', participanteController.obtenerParticipante);
router.get('/obtenerParticipantes', participanteController.obtenerParticipantes);
router.put('/desactivarParticipante', participanteController.desactivarParticipante);
router.post('/asignarParticipanteAHabitacion', participanteController.asignarParticipanteAHabitacion);
router.post('/asignarParticipanteACompania', participanteController.asignarParticipanteACompania);
router.put('/asistioParticipante', participanteController.asistioParticipante);
router.post(
  '/cargaParticipantes',
  upload.single('archivo'), // 👈 este nombre debe coincidir con el del input HTML o Postman
  participanteController.cargarExcelParticipantes
);

module.exports = router;
