import supabase, { supabaseUrl } from "./supabase";

export async function getStudents(classId) {
  const { data, error } = await supabase
    .from("students")
    .select("id, firstName, lastName, code, class_id")
    .eq("class_id", classId);

  if (error) {
    console.error(error);
    throw new Error("Students not found");
  }
  return data;
}

export async function getAllStudents() {
  const { data, error } = await supabase.from("students").select("*");

  if (error) {
    console.error(error);
    throw new Error("Students not found");
  }
  return data;
}

export async function deleteStudent(studentId) {
    console.log("inside delete API");
  const { data, error } = await supabase
    .from("students")
    .delete()
    .eq("id", studentId);

    if (error) {
        console.error(error);
        throw new Error("Booking could not be deleted");
    }

    return data;
}
