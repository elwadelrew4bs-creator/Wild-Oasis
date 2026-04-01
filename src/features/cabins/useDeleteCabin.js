
import { deleteCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
export function useDeleteCabin() {
const queryClient = useQueryClient()
  const {isPending , mutate} = useMutation({
    mutationFn: ({ image, id }) => deleteCabin(image, id),
    onSuccess:()=>{
      toast.success("Cabin deleted successfully")
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      })
    },
    onError:(err)=>toast.error(err.message)
   })
  return { isPending, mutate };

}