// participanteControllers.js
const habitacionService = require("../services/habitacionService");

const crearHabitacion = async (req, res) => {
  const body = req.body;

  try {
    const habitacion = await habitacionService.crearHabitacion(body);
    res.status(201).json(habitacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerHabitaciones = async (req, res) => {
  try {
    const habitacion = await habitacionService.obtenerHabitaciones();
    res.status(201).json(habitacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const obtenerHabitacion = async (req, res) => {
  const { id } = req.params;
  try {
    const habitacion = await habitacionService.obtenerHabitacion(id);
    res.status(201).json(habitacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarHabitacion = async (req, res) => {
  const { id } = req.params;
  try {
    const habitacion = await habitacionService.eliminarHabitacion(id);
    res.status(201).json(habitacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editarHabitacion = async (req, res) => {
  const body = req.body
  try {
    const habitacion = await habitacionService.editarHabitacion(body.id, body);
    res.status(201).json(habitacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerParticipantesPorHabitacion = async (req, res) => {
  const { idHabitacion } = req.params;
  try {
    const habitacion =
      await habitacionService.obtenerParticipantesPorHabitacion(idHabitacion);
    res.status(201).json(habitacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerHabitacionesConParticipantes = async (req, res) => {
  try {
    const habitacion =
      await habitacionService.obtenerHabitacionesConParticipantes();
    res.status(201).json(habitacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearHabitacion,
  editarHabitacion,
  obtenerHabitaciones,
  obtenerHabitacion,
  eliminarHabitacion,
  obtenerHabitacionesConParticipantes,
  obtenerParticipantesPorHabitacion,
};
