import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAllSchedules, getSchedulesByClass } from "../../services/apiSchedules";


export function useSchedule(classId){

    //const { classId } = useParams();

    const {
        isLoading,
        data: result,
        error,
    } = useQuery({
        queryKey: ["classSchedule", classId],
        queryFn: () => getSchedulesByClass(classId),
        retry: false,
    });

    return { isLoading, error, result};


}