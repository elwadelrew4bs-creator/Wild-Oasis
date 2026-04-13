import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router";

function CabinTable() {
  const {
    isPending,
    error,
    data: cabins,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  const [searchParams] = useSearchParams();
  if (isPending) return <Spinner />;
  // Filter
  const filterValue = searchParams.get("discount") || "all";
  const filteredCabins = cabins.filter((cabin) => {
    if (filterValue === "no-discount") return cabin.discount === 0;
    if (filterValue === "with-discount") return cabin.discount > 0;
    return true;
  });
  // Sorting
 
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === 'asc' ? 1 : -1
  const sortedCabins = [...filteredCabins].sort((a, b) => {
  if (typeof a[field] === "string")
    return a[field].localeCompare(b[field]) * modifier;
  return (a[field] - b[field]) * modifier;
});


  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">  
  <Table.Header>
    <div></div>         
    <div>Cabin</div>    
    <div>Capacity</div>
    <div>Price</div>
    <div>Discount</div>
    <div></div>         
  </Table.Header>
  <Table.Body
    data={sortedCabins}
    render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
  />
</Table>
    </Menus>
  );
}

export default CabinTable;
