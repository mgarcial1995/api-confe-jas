// participanteControllers.js
const participanteService = require("../services/participanteService");

const crearParticipante = async (req, res) => {
  const body = req.body;
  try {
    const participante = await participanteService.crearParticipante(body);
    res.status(201).json(participante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editarParticipante = async (req, res) => {
  const body = req.body;
  try {
    const participante = await participanteService.editarParticipante(
      body.id,
      body
    );
    res.status(201).json(participante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const asignarParticipanteAHabitacion = async (req, res) => {
  const body = req.body;
  try {
    const participante =
      await participanteService.asignarParticipanteAHabitacion(
        body.idparticipante,
        body.habitacion
      );
    res.status(201).json(participante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const asignarParticipanteACompania = async (req, res) => {
  const body = req.body;
  try {
    const participante = await participanteService.asignarParticipanteACompania(
      body.idparticipante,
      body.idCompania
    );
    res.status(201).json(participante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerParticipantes = async (req, res) => {
  try {
    const participante = await participanteService.obtenerParticipantes();
    res.status(201).json(participante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerParticipante = async (req, res) => {
  const { id } = req.params;
  try {
    const participante = await participanteService.obtenerParticipante(id);
    res.status(201).json(participante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const desactivarParticipante = async (req, res) => {
  const { idParticipante } = req.body;
  try {
    const participante = await participanteService.desactivarParticipante(
      idParticipante
    );
    res.status(201).json(participante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const asistioParticipante = async (req, res) => {
  const { idParticipante } = req.body;
  try {
    const participante = await participanteService.asistioParticipante(
      idParticipante
    );
    res.status(201).json(participante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cargarExcelParticipantes = async (req, res) => {
  try {
    const archivo = req.file;

    if (!archivo) {
      return res.status(400).json({ error: "No se envió ningún archivo." });
    }

    const resultado = await participanteService.cargaMasivaParticipantes(
      archivo.path
    );

    res.status(200).json({
      mensaje: "Participantes importados con éxito",
      cantidad: resultado.length,
      participantes: resultado,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearParticipante,
  editarParticipante,
  obtenerParticipante,
  obtenerParticipantes,
  desactivarParticipante,
  asignarParticipanteAHabitacion,
  asignarParticipanteACompania,
  asistioParticipante,
  cargarExcelParticipantes,
};
