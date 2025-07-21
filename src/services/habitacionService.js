const supabase = require("../../config/supabase");

const crearHabitacion = async (body) => {
  return await supabase.from("habitacion").insert(body);
};

const obtenerParticipantesPorHabitacion = async (idHabitacion) => {
  const { data, error } = await supabase
    .from("participante")
    .select("*")
    .eq("id_habitacion", idHabitacion)
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
};

const editarHabitacion = async (id, datos) => {
  const { data, error } = await supabase
    .from("habitacion")
    .update(datos)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data[0];
};

const eliminarHabitacion = async (id, datos) => {
  const { data, error } = await supabase
    .from("habitacion")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return data;
};

const obtenerHabitacionesConParticipantes = async () => {
  const { data, error } = await supabase
    .from("habitacion")
    .select(
      `
      id,
      puerta_habitacion,
      numero_habitacion,
      letra_habitacion,
      participantes:participante ( id, nombres, apellidos )
    `
    )
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
};


const obtenerHabitacion = async (id) => {
  const { data } = await supabase
    .from("habitacion")
    .select("*")
    .eq("id", id)
    .single(); 
  return data;
};

const obtenerHabitaciones = async () => {
  const { data, error } = await supabase
    .from("habitacion")
    .select("id, puerta_habitacion, numero_habitacion, letra_habitacion")
    .order("id", { ascending: true });
  if (error) throw error;

  return data;
};

module.exports = {
  crearHabitacion,
  obtenerHabitacion,
  editarHabitacion,
  obtenerHabitaciones,
  eliminarHabitacion,
  obtenerHabitacionesConParticipantes,
  obtenerParticipantesPorHabitacion,
};
