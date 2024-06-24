import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getStudents } from "../../services/apiStudents";
import { getAllStudents } from "../../services/apiStudents";


export function useStudents() {
    const { classId } = useParams();
    //console.log("use students param: ", classId);

    //const {
    //    isLoading,
    //    data: result,
    //    error,
    //} = useQuery({
    //    queryKey: ["allStudents"],
    //    queryFn: () => getAllStudents(),
    //    retry: false,
    //});

    const {
        isLoading,
        data: result,
        error,
    } = useQuery({
        queryKey: ["studentsByClass", classId],
        queryFn: () => getStudents(classId),
        retry: false,
    });

    return { isLoading, error, result};
}