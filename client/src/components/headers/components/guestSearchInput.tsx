import React, {Fragment} from "react";
import JDsearchInput from "../../../atoms/searchInput/SearchInput";
import {SELECT_DUMMY_OP} from "../../../types/enum";
import {getBookings_GetBookings_bookings} from "../../../types/api";
import BookingModalWrap from "../../bookingModal/BookingModalWrap";
import UserModal from "../../../pages/middleServer/super/components/userModal";
import {useModal} from "../../../actions/hook";
import $ from "jquery";

interface IProps {
  loading: boolean;
  houseId: string;
  onTypeValue: string;
  setType: any;
  bookings: getBookings_GetBookings_bookings[];
}

const GuestSearchInput: React.FC<IProps> = ({
  onTypeValue,
  setType,
  bookings,
  houseId,
  loading
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

  const unHilightTarget = () => {
    $(".assigItem--searched").removeClass("assigItem--searched");
  };

  const hilightTarget = (target: JQuery<HTMLElement>) => {
    $(".assigItem--searched").removeClass("assigItem--searched");
    const scrollTarget = $(`.rct-scroll`).get(0);
    $(target).addClass("assigItem--searched");
    const targetDom = $(target).get(0);
    window.scrollTo({top: targetDom.offsetTop});
    const targetWidth = $(scrollTarget).width() || 0;
    scrollTarget.scrollTo({left: targetDom.offsetLeft - targetWidth / 2});
  };

  const handleFindOne = (label?: string | null, id?: string) => {
    if (!id) return;
    setType(label);
    const target = $(`.assigItem--booking${id}`);
    const targetDom = $(target).get(0);
    if (targetDom) {
      hilightTarget(target);
    } else {
      openBookingModal(id);
    }
  };

  const handleTypeChange = (value?: string) => {
    if (!value) unHilightTarget();
    setType(value);
  };

  return (
    <Fragment>
      <JDsearchInput
        isLoading={loading}
        onTypeValue={onTypeValue}
        onTypeChange={handleTypeChange}
        onFindOne={handleFindOne}
        onListClick={handleClickList}
        setTypeWhenFindOne={true}
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
