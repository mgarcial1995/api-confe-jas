const supabase = require("../../config/supabase");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");

const cargaMasivaParticipantes = async (rutaArchivo) => {
  const headerMap = {
    Nombres: "nombres",
    Apellidos: "apellidos",
    NombrePreferencia: "nombre_preferencia",
    Edad: "edad",
    Sexo: "sexo",
    TallaCamiseta: "talla_camiseta",
    Barrio: "barrio",
    Estaca: "estaca",
    EsMiembro: "es_miembro",
    Celular: "celular",
  };

  const workbook = xlsx.readFile(rutaArchivo);
  const hoja = workbook.Sheets[workbook.SheetNames[0]];

  const datosBrutos = xlsx.utils.sheet_to_json(hoja);

  const participantes = datosBrutos.map((fila) => {
    const participante = {};

    for (const key in fila) {
      if (headerMap.hasOwnProperty(key)) {
        const campo = headerMap[key];
        let valor = fila[key];

        if (campo === "es_miembro") {
          valor = valor?.toString().toLowerCase() === "si" ? true : false;
        }

        participante[campo] = valor;
        participante["estado"] = 1;
      }
    }
    return participante;
  });

  const { data, error } = await supabase
    .from("participante")
    .insert(participantes);

  if (error) throw error;

  fs.unlink(rutaArchivo, (err) => {
    if (err) {
      console.warn(
        `⚠️ No se pudo eliminar el archivo: ${rutaArchivo}`,
        err.message
      );
    } else {
      console.log(`🧹 Archivo eliminado: ${rutaArchivo}`);
    }
  });

  return participantes;
};

const crearParticipante = async (body) => {
  const { data, error } = await supabase
    .from("participante")
    .insert(body)
    .select();
  if (error) throw error;
  return data[0];
};

const editarParticipante = async (id, datos) => {
  const { data, error } = await supabase
    .from("participante")
    .update(datos)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data[0];
};

const obtenerParticipantes = async () => {
  const { data } = await supabase
    .from("participante")
    .select(`
      *,
      habitacion ( puerta_habitacion )
    `)
    .order("id", { ascending: true });
  return data;
};

const obtenerParticipante = async (id) => {
  const { data } = await supabase
    .from("participante")
    .select(
      `*,
      habitacion: id_habitacion (*)
      `
    )
    .eq("id", id)
    .single(); // <- opcional, si solo esperas un resultado
  return data;
};

const desactivarParticipante = async (id) => {
  const { data, error } = await supabase
    .from("participante")
    .update({ estado: 0 })
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
};

const asistioParticipante = async (id) => {
  const { data, error } = await supabase
    .from("participante")
    .update({ asistencia: true })
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
};

const asignarParticipanteAHabitacion = async (idParticipante, habitacion) => {
  // 1. Obtener los límites de la habitación
  const { data: habitaciones, error: habError } = await supabase
    .from("habitacion")
    .select("cant_max_habitacion")
    .eq("id", habitacion.id)
    .single();

  if (habError) throw habError;
  if (!habitaciones) throw new Error("Habitación no encontrada.");

  const max = habitaciones.cant_max_habitacion;

  // 2. Contar cuántos participantes ya hay en esa habitación
  const { count, error: countError } = await supabase
    .from("participante")
    .select("*", { count: "exact", head: true })
    .eq("id_habitacion", habitacion.id);

  if (countError) throw countError;

  if (count >= max) {
    throw new Error(
      "La habitación ya alcanzó el número máximo de participantes."
    );
  }

  // 3. Hacer la asignación
  const { data, error } = await supabase
    .from("participante")
    .update({ id_habitacion: habitacion.id, habitacion: habitacion.numero })
    .eq("id", idParticipante)
    .select();

  if (error) throw error;

  return data[0];
};

const asignarParticipanteACompania = async (idParticipante, idCompania) => {
  // 1. Obtener los límites de la habitación
  const { data: compania, error: compError } = await supabase
    .from("compania")
    .select("max_cant_participantes, numero_compania")
    .eq("id", idCompania)
    .single();

  if (compError) throw compError;
  if (!compania) throw new Error("Habitación no encontrada.");

  const max = compania.max_cant_participantes;
  const numero_compania = compania.numero_compania;

  // 2. Contar cuántos participantes ya hay en esa habitación
  const { count, error: countError } = await supabase
    .from("participante")
    .select("*", { count: "exact", head: true })
    .eq("id_compania", idCompania);

  if (countError) throw countError;

  if (count >= max) {
    throw new Error(
      "La compañia ya alcanzó el número máximo de participantes."
    );
  }

  // 3. Hacer la asignación
  const { data, error } = await supabase
    .from("participante")
    .update({ id_compania: idCompania, num_compania: numero_compania })
    .eq("id", idParticipante)
    .select();

  if (error) throw error;

  return data[0];
};

module.exports = {
  crearParticipante,
  obtenerParticipantes,
  editarParticipante,
  obtenerParticipante,
  desactivarParticipante,
  asignarParticipanteAHabitacion,
  asignarParticipanteACompania,
  asistioParticipante,
  cargaMasivaParticipantes,
};
