import React, {Fragment} from "react";
import JDsearchInput from "../../../atoms/searchInput/SearchInput";
import {SELECT_DUMMY_OP} from "../../../types/enum";
import {getBookings_GetBookings_bookings} from "../../../types/api";
import BookingModalWrap from "../../bookingModal/BookingModalWrap";
import UserModal from "../../../pages/middleServer/super/components/userModal";
import {useModal} from "../../../actions/hook";
import $ from "jquery";

interface IProps {
  houseId: string;
  onTypeValue: string;
  onTypeChange: any;
  bookings: getBookings_GetBookings_bookings[];
}

const GuestSearchInput: React.FC<IProps> = ({
  onTypeValue,
  onTypeChange,
  bookings,
  houseId
}) => {
  const bookingModalHook = useModal(false);

  const openBookingModal = (id: string) => {
    bookingModalHook.openModal({
      bookingId: id
    });
  };

  const handleClickList = (
    value: string | undefined,
    id: string | undefined
  ): void => {
    if (!id) return;
    openBookingModal(id);
  };

  const handleFindOne = (label?: string | null, id?: string) => {
    if (!id) return;

    const target = $(`.assigItem--booking${id}`);
    if ($(target).get(0)) {
      $(target).addClass("assigItem--searched");
      window.scrollTo({top: $(target).get(0).offsetTop});
    } else {
      openBookingModal(id);
    }
  };

  return (
    <Fragment>
      <JDsearchInput
        onTypeValue={onTypeValue}
        onTypeChange={onTypeChange}
        onFindOne={handleFindOne}
        onListClick={handleClickList}
        staticList
        filter={false}
        asDetail="phoneNumber"
        asId="_id"
        asName="name"
        dataList={bookings}
      />
      <BookingModalWrap houseId={houseId} modalHook={bookingModalHook} />
    </Fragment>
  );
};

export default GuestSearchInput;
