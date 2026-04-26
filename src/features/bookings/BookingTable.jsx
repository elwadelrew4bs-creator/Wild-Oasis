import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import styled from "styled-components";
import { useState } from "react";

const Image = styled.img`
height:100px;
width:100px
`
const Item=styled.div`
display:flex;
flex-direction:column;
flex-wrap: wrap;
`
const Container=styled.div`
display:flex;
flex-wrap: wrap;
`
const PageButton=styled.button`
height:25px;
width:20px;
background-color:#5bb450;
`
function BookingTable({bookings}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const buttonpages = Array.from({length:totalPages} , (_,i)=>{return<PageButton key={i} onClick={()=>setCurrentPage(i+1)}>{i+1}</PageButton>})
  // Get current page items using Array.from()
  const currentItems = Array.from(
    { length: itemsPerPage },
    (_, i) => {
      const index = (currentPage - 1) * itemsPerPage + i;
      return index < bookings.length ? bookings[index] : null;
    }
  ).filter(item => item !== null);
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        {/* <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        /> */}
        <Container>

        {currentItems.map((b,i)=><Item key={i}><Image src={b.image} alt={b.name} key={i}/><p>{b.name}</p></Item>)}
        </Container>
        {buttonpages}
      </Table>
    </Menus>
  );
}

export default BookingTable;
