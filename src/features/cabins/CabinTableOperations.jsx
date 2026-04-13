import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
    return (
        <TableOperations>
            <Filter filterField='discount' options={[
                {value: 'all', label:'All'},
                {value: 'no-discount', label:'No Discount'},
                {value: 'with-discount', label:'With Dicount'},
            ]}/>
            <SortBy options={[
                {value: 'name-asc', label:'Sort by name (A-Z)'},
                {value: 'name-desc', label:'Sort by name (Z-A)'},
                {value: 'regularPrice-asc', label:'Sort by  price(Low First'},
                {value: 'regularPrice-desc', label:'Sort by  price(High First'},
                {value: 'maxCapacity-asc', label:'Sort by Capacity(Low First'},
                {value: 'maxCapacity-desc', label:'Sort by  Capacity(High First'},
            ]}/>
        </TableOperations>
    )
}

export default CabinTableOperations
