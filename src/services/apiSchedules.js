import supabase, { supabaseUrl } from "./supabase";


export async function getAllSchedules(){

    //const { data, error } = await supabase.from("seances").select("*");
    const { data, error } = await supabase.from("seances").select('id, classes(code), subjects(id, name), period, startTime, endTime, teachers(firstName, lastName)');
      

  if (error) {
    console.error(error);
    throw new Error("Seances not found");
  }
  return data;
}

export async function getSchedulesByClass(classe){
  console.log("api: ", classe);
  if(classe){
    const { data, error } = await supabase.from("seances").select('id, classes(code), subjects(id, name), period, startTime, endTime, teachers(firstName, lastName)').eq('class_id', classe);
    if(error){
      console.log(error);
      throw new Error("Seance not found");
    }
    return data;
  }else{
    const { data, error } = await supabase.from("seances").select('*');
    if(error){
      console.log(error);
      throw new Error("Seance not found");
    }
    return data;
  }
  
}