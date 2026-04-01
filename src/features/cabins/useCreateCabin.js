import { createEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
export function useCreateCabin() {
    const queryClient = useQueryClient();
    const { isPending: isCreating, mutate: createCabin } = useMutation({
        mutationFn: (newCabin) => createEditCabin(newCabin),
        onSuccess: () => {
          toast.success("Cabin created successfully");
          queryClient.invalidateQueries({
            queryKey: ["cabins"],
          });
        },
        onError: (err) => toast.error(err.message),
      });
      return {
        isCreating,
        createCabin
      }
}