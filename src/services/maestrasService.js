const supabase = require("../../config/supabase");

const crearEstaca = async (body) => {
  return await supabase.from("estaca").insert(body);
};

const obtenerEstacas = async () => {
  const { data, error } = await supabase
    .from("estaca")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
};

const editarEstaca = async (id, datos) => {
  const { data, error } = await supabase
    .from("estaca")
    .update(datos)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data[0];
};

const obtenerEstaca = async (id) => {
  const { data } = await supabase
    .from("estaca")
    .select("*")
    .eq("id", id)
    .single();
  return data;
};
const eliminarEstaca = async (id) => {
  const { data, error } = await supabase.from("estaca").delete().eq("id", id);
  if (error) throw error;
  return data;
};

module.exports = {
  crearEstaca,
  obtenerEstacas,
  editarEstaca,
  obtenerEstaca,
  eliminarEstaca
};
