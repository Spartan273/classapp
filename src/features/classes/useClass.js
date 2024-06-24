import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAllClasses } from "../../services/apiClasses";

export function useClass(){


    const {
        isLoading,
        data: result,
        error,
    } = useQuery({
        queryKey: ["classes"],
        queryFn: () => getAllClasses(),
        retry: false,
    });

    return { isLoading, error, result};
}