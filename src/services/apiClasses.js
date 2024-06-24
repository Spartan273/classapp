import supabase, { supabaseUrl } from "./supabase";


export async function getAllClasses(){

    const { data, error } = await supabase.from('classes').select('id, code');

    if (error)
        {
            throw new Error("Classes not found");
        }
        
    return data;
}