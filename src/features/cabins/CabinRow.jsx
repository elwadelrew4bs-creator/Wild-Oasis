import styled from "styled-components";
import { HiSquare2Stack } from "react-icons/hi2";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    image,
    maxCapacity,
    regularPrice,
    discount,
    description,
  } = cabin;
  const { isPending, mutate } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  function handleDuplicate() {
    createCabin({
      name: `Duplicate of ${name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
      description,
    });
  }
  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{regularPrice}</Price>
      <Discount>{!discount ? "—" : discount}</Discount>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opensName="edit-form">
                {({ onClick }) => (
                  <Menus.Button onClick={onClick} icon={<MdModeEdit />}>
                    Edit
                  </Menus.Button>
                )}
              </Modal.Open>
              <Modal.Open opensName="delete-form">
                {({ onClick }) => (
                  <Menus.Button onClick={onClick} icon={<MdDeleteForever />}>
                    Delete
                  </Menus.Button>
                )}
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="edit-form">
              {({ onCloseModal }) => (
                <CreateCabinForm
                  cabinToEdit={cabin}
                  onCloseModal={onCloseModal}
                />
              )}
            </Modal.Window>
            <Modal.Window name="delete-form">
              {({ onCloseModal }) => (
                <ConfirmDelete
                  resourceName={name}
                  disabled={isPending}
                  onConfirm={() => mutate({ image, id: cabinId })}
                  onCloseModal={onCloseModal}
                />
              )}
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
