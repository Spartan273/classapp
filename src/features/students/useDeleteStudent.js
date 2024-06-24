import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteStudent as deleteStudentApi } from "../../services/apiStudents";

export function useDeleteStudent() {
    console.log("useDelete");
  const queryClient = useQueryClient();

  const { isloading: isDeleting, mutate: deleteStudent } = useMutation({
    mutationFn: deleteStudentApi,
    onSuccess: () => {
      toast.success("Student successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteStudent };
}
