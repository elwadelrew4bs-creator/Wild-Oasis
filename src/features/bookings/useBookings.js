import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/constants";
export function useBookings() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const [field,direction] = sortByRaw.split("-");
    const sortBy = {field,direction}
    const page = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const {
    isLoading,
    data: {bookings, count} = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter , sortBy, page],
    queryFn: () => getBookings({filter, sortBy, page}),
    onSuccess: () => {
      toast.success("Bookings loaded successfully");
    },
    onError: (err) => toast.error(err.message),
  });
  const pageCount = Math.ceil(count / PAGE_SIZE)
  if(page < pageCount) 
  queryClient.prefetchQuery({
    queryKey: ["bookings", filter , sortBy, page + 1],
    queryFn: () => getBooking({filter, sortBy, page: page + 1}),
  })
  if(page > 1)
  queryClient.prefetchQuery({
    queryKey: ["bookings", filter , sortBy, page - 1],
    queryFn: () => getBooking({filter, sortBy, page: page - 1}),
  })
  return {
    isLoading,
    bookings,
    count,
    error,
  };
}
