// participanteControllers.js
const companiaService = require("../services/companiaService");

const crearCompania = async (req, res) => {
  const body = req.body;

  try {
    const participante = await companiaService.crearCompania(body);
    res.status(201).json(participante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerCompanias = async (req, res) => {
  try {
    const participante = await companiaService.obtenerCompanias();
    res.status(201).json(participante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerCompania = async (req, res) => {
  const { id } = req.params;
  try {
    const participante = await companiaService.obtenerCompania(id);
    res.status(201).json(participante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarCompania = async (req, res) => {
  const { id } = req.params;
  try {
    const participante = await companiaService.eliminarCompania(id);
    res.status(201).json(participante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editarCompania = async (req, res) => {
  const body = req.body
  try {
    const habitacion = await companiaService.editarCompania(body.id, body);
    res.status(201).json(habitacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerCompaniasConParticipantes = async (req, res) => {
  try {
    const participante =
      await companiaService.obtenerCompaniasConParticipantes();
    res.status(201).json(participante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerParticipantesPorNumeroCompania = async (req, res) => {
  const { idCompania } = req.params;
  try {
    const participante =
      await companiaService.obtenerParticipantesPorNumeroCompania(idCompania);
    res.status(201).json(participante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerParticipantesPorEdadPorCompania = async (req, res) => {
  const { idCompania } = req.params;
  try {
    const participante =
      await companiaService.obtenerParticipantesPorEdadPorCompania(idCompania);
    res.status(201).json(participante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearCompania,
  editarCompania,
  obtenerCompania,
  obtenerCompanias,
  eliminarCompania,
  obtenerCompaniasConParticipantes,
  obtenerParticipantesPorNumeroCompania,
  obtenerParticipantesPorEdadPorCompania
};
