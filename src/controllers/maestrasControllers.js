// participanteControllers.js
const maestroService = require("../services/maestrasService");

const crearEstaca = async (req, res) => {
  const body = req.body;
  try {
    const habitacion = await maestroService.crearEstaca(body);
    res.status(201).json(habitacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerEstacas = async (req, res) => {
  try {
    const habitacion = await maestroService.obtenerEstacas();
    res.status(201).json(habitacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const obtenerEstaca = async (req, res) => {
  const { id } = req.params;
  try {
    const habitacion = await maestroService.obtenerEstaca(id);
    res.status(201).json(habitacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const eliminarEstaca = async (req, res) => {
  const { id } = req.params;
  try {
    const habitacion = await maestroService.eliminarEstaca(id);
    res.status(201).json(habitacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editarEstaca = async (req, res) => {
  const body = req.body
  try {
    const habitacion = await maestroService.editarEstaca(body.id, body);
    res.status(201).json(habitacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  crearEstaca,
  obtenerEstacas,
  obtenerEstaca,
  eliminarEstaca,
  editarEstaca,
};
