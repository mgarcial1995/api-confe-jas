const supabase = require("../../config/supabase");

const crearCompania = async (body) => {
  return await supabase.from("compania").insert(body);
};

const editarCompania = async (id, datos) => {
  const { data, error } = await supabase
    .from("compania")
    .update(datos)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data[0];
};

const obtenerCompanias = async () => {
  const { data, error } = await supabase
    .from("compania")
    .select("*")
    .order("numero_compania", { ascending: true });
  if (error) throw error;

  return data;
};

const obtenerCompania = async (id) => {
  const { data, error } = await supabase
    .from("compania")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;

  return data;
};

const obtenerParticipantesPorNumeroCompania = async (numCompania) => {
  const { data, error } = await supabase
    .from("participante")
    .select("*")
    .eq("id_compania", numCompania);

  if (error) throw error;
  return data;
};

const obtenerParticipantesNumeroCompania = async (numCompania) => {
  const { data, error } = await supabase
    .from("participante")
    .select("*")
    .is("habitacion", null)
    .eq("num_compania", numCompania);

  if (error) throw error;
  return data;
};

const eliminarCompania = async (id, datos) => {
  const { data, error } = await supabase.from("compania").delete().eq("id", id);

  if (error) throw error;
  return data;
};

const obtenerCompaniasConParticipantes = async () => {
  const { data, error } = await supabase
    .from("compania")
    .select(
      `
      id,
      numero_compania,
      edad_minima,
      edad_maxima,
      participantes:participante ( id, nombres, apellidos )
    `
    )
    .order("numero_compania", { ascending: true });

  if (error) throw error;
  return data;
};

const obtenerParticipantesPorEdadPorCompania = async (idCompania) => {
  const { data: compania, error: errorCompania } = await supabase
    .from("compania")
    .select("edad_minima, edad_maxima")
    .eq("id", idCompania) // 👈 ID de la compañía a evaluar
    .single();

  const { edad_minima, edad_maxima } = compania;

  const { data: participantes, error: errorParticipantes } = await supabase
    .from("participante")
    .select("*")
    .gte("edad", edad_minima)
    .lte("edad", edad_maxima)
    .is("num_compania", null)
    .order("edad", { ascending: true });

  if (errorParticipantes || errorCompania) throw errorParticipantes;
  return participantes;
};

module.exports = {
  crearCompania,
  editarCompania,
  obtenerCompanias,
  obtenerCompania,
  eliminarCompania,
  obtenerParticipantesNumeroCompania,
  obtenerCompaniasConParticipantes,
  obtenerParticipantesPorNumeroCompania,
  obtenerParticipantesPorEdadPorCompania,
};
