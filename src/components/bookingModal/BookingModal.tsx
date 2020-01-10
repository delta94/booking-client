import React, { Fragment, useState, useMemo } from "react";
import moment from "moment";
import Modal, { JDtoastModal } from "../../atoms/modal/Modal";
import {
  useInput,
  useSelect,
  IUseModal,
  useDayPicker,
  useModal,
  useDrawer,
  LANG
} from "../../hooks/hook";
import SelectBox from "../../atoms/forms/selectBox/SelectBox";
import InputText from "../../atoms/forms/inputText/InputText";
import Button from "../../atoms/button/Button";
import RoomSelectInfoTable from "./components/RoomSelectInfoTable";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import {
  PaymentStatus,
  AutoSendWhen,
  DateFormat,
  BookingStatus,
  WindowSize
} from "../../types/enum";
import {
  FUNNELS_OP,
  BOOKING_STATUS_OP,
  PAYMETHOD_FOR_HOST_OP,
  PAYMENT_STATUS_OP
} from "../../types/const";
import "./BookingModal.scss";
import { GB_booking, BookingModalMode } from "../../types/interface";
import { MutationFn } from "react-apollo";
import {
  updateBooking,
  updateBookingVariables,
  deleteBooking,
  deleteBookingVariables,
  startBooking,
  startBookingVariables,
  Funnels
} from "../../types/api";
import SendSMSmodalWrap, { IModalSMSinfo } from "../smsModal/SendSmsModalWrap";
import Preloader from "../../atoms/preloader/Preloader";
import { toast } from "react-toastify";
import { isPhone } from "../../utils/inputValidations";
import { autoComma, muResult, toNumber } from "../../utils/utils";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import _ from "lodash";
import C from "../../utils/C";
import RoomAssigedInfoTable from "./components/RoomAssigedInfoTable";
import {
  makeAssigInfo,
  makeSmsInfoParam,
  bookingModalValidate,
  bookingModalGetStartBookingVariables
} from "./helper";
import { getRoomSelectInfo } from "../../utils/typeChanger";
import { IBookingModalContext } from "./declaration";
import JDLabel from "../../atoms/label/JDLabel";

interface IProps {
  modalHook: IUseModal;
  bookingData: GB_booking;
  placeHolederPrice: number;
  startBookingMu: MutationFn<startBooking, startBookingVariables>;
  updateBookingMu: MutationFn<updateBooking, updateBookingVariables>;
  deleteBookingMu: MutationFn<deleteBooking, deleteBookingVariables>;
  startBookingLoading: boolean;
  context: IContext;
  loading: boolean;
  mode?: BookingModalMode;
}

const BookingModal: React.FC<IProps> = ({
  modalHook,
  bookingData,
  updateBookingMu,
  startBookingMu,
  deleteBookingMu,
  startBookingLoading,
  placeHolederPrice,
  loading,
  context,
  mode
}) => {
  const isCreateMode = mode === "CREATE" || mode === "CREATE_ASSIG";
  const {
    _id: bookingId,
    email,
    memo,
    createdAt,
    payment,
    phoneNumber,
    status: bookingStatus,
    checkIn,
    checkOut,
    name,
    funnels,
    guests
  } = bookingData;
  const { payMethod, status: paymentStatus, totalPrice } = payment;
  const { house } = context;
  const { _id: houseId } = house;
  const sendSmsModalHook = useModal<IModalSMSinfo>(false);
  const confirmModalHook = useModal(false);
  const bookingNameHook = useInput(name);
  const bookingPhoneHook = useInput(phoneNumber, true);
  const priceHook = useInput(totalPrice);
  const memoHook = useInput(memo || "");
  const emailHook = useInput(email);
  const assigInfoDrawHook = useDrawer(mode === "CREATE_ASSIG");
  // 아래 메모 목적은 인풋이 바뀔떄마다 바뀌는걸 막기위함임
  const roomSelectInfo = useMemo(
    () => getRoomSelectInfo(bookingData.guests, bookingData.roomTypes || []),
    [bookingData]
  );
  const isPhabletDown = window.innerWidth < WindowSize.TABLET;
  const [assigInfo, setAssigInfo] = useState(makeAssigInfo(guests));
  const modalStyle = {
    content: {
      maxWidth: "30rem"
    }
  };
  const payMethodHook = useSelect(
    C(
      bookingId !== "default",
      { value: payMethod, label: LANG(payMethod) },
      null
    )
  );
  const paymentStatusHook = useSelect<PaymentStatus>(
    bookingId !== "default"
      ? { value: paymentStatus, label: LANG("PaymentStatus", paymentStatus) }
      : {
          value: PaymentStatus.COMPLETE,
          label: LANG("PaymentStatus", PaymentStatus.COMPLETE)
        }
  );
  const funnelStatusHook = useSelect<Funnels | null>(
    funnels ? { value: funnels, label: LANG("Funnels", funnels) } : null
  );
  const bookingStatusHook = useSelect(
    C(
      bookingId !== "default",
      {
        value: bookingStatus,
        label: LANG(bookingStatus)
      },
      BOOKING_STATUS_OP[0]
    )
  );
  const resvDateHook = useDayPicker(
    moment(checkIn).toDate(),
    moment(checkOut).toDate()
  );

  const bookingModalContext: IBookingModalContext = {
    bookingStatusHook,
    resvDateHook,
    paymentStatusHook,
    bookingNameHook,
    bookingPhoneHook,
    funnelStatusHook,
    priceHook,
    payMethodHook,
    emailHook,
    guests,
    assigInfo,
    memoHook,
    houseId,
    mode
  };

  const isProgressing = bookingStatus === BookingStatus.PROGRESSING;
  const allReadOnly = isProgressing;

  // SMS 발송 모달에 전달할 정보를 생성
  const smsModalInfoTemp = makeSmsInfoParam(bookingModalContext);

  // 예약삭제 여부를 물어보는 버튼 컬백함수
  const deleteModalCallBackFn = (confirm: boolean) => {
    if (confirm) {
      deleteBookingMu({
        variables: {
          bookingId: modalHook.info.bookingId
        }
      });
    }
  };

  // smsIcon 핸들
  const handleSmsIconClick = () => {
    if (!bookingPhoneHook.isValid) {
      toast.warn(LANG("not_a_valid_mobile_number"));
      return;
    }
    sendSmsModalHook.openModal({
      ...smsModalInfoTemp
    });
  };

  // 예약삭제 버튼 클릭
  const handleDeletBtnClick = () => {
    confirmModalHook.openModal({
      txt: LANG("are_you_sure_you_want_to_delete_the_reservation")
    });
  };

  // 부킹모달 예약 명령
  const startBooking = async (callBackStartBooking?: any) => {
    if (!bookingModalValidate(bookingModalContext)) return;

    try {
      const result = await startBookingMu({
        variables: bookingModalGetStartBookingVariables(bookingModalContext)
      });
      if (muResult(result, "StartBooking")) callBackStartBooking();
    } catch (error) {
      modalHook.closeModal();
    }
  };

  // 예약생성 버튼 핸들
  const handleCreateBtnClick = () => {
    if (!bookingData.roomTypes) return;

    const smsCallBackFn = async (flag: boolean, sendSmsMu: any) => {
      if (flag) {
        startBooking(sendSmsMu);
      } else {
        startBooking();
      }
    };

    sendSmsModalHook.openModal({
      ...smsModalInfoTemp,
      autoSendWhen: AutoSendWhen.WHEN_BOOKING_CREATED,
      callBackFn: smsCallBackFn
    });
  };

  // 예약수정 버튼 핸들
  const handleUpdateBtnClick = () => {
    if (!bookingModalValidate(bookingModalContext)) return;
    // SMS 인포를 꺼내서 발송할 SMS 문자가 있는지 확인해야할것 같다.
    updateBookingMu({
      variables: {
        bookingId: modalHook.info.bookingId,
        params: {
          email: "demo@naver.com",
          memo: memoHook.value,
          checkInInfo: {
            isIn: bookingData.checkIn.isIn || false
          },
          name: bookingNameHook.value,
          payMethod: payMethodHook.selectedOption!.value,
          paymentStatus: paymentStatusHook.selectedOption!.value,
          bookingStatus: bookingStatusHook.selectedOption!.value,
          phoneNumber: bookingPhoneHook.value,
          price: toNumber(priceHook.value),
          funnels: funnelStatusHook.selectedOption?.value || null
        }
      }
    });
    modalHook.closeModal();
  };

  return (
    <Modal
      style={modalStyle}
      paddingSize="large"
      {...modalHook}
      className={`Modal bookingModal ${(loading || startBookingLoading) &&
        "bookingModal--loading"}`}
      overlayClassName="Overlay"
    >
      <Preloader size={"large"} loading={loading || startBookingLoading} />
      {loading || startBookingLoading || (
        <Fragment>
          <div className={`JDz-index-1 ${isPhabletDown || "flex-grid-grow"}`}>
            <div className="modal__section flex-grid__col ">
              <h5>{LANG("booker_info")}</h5>
              <div
                className={`JDflex JDflex--oneone ${isPhabletDown ||
                  "JDflex--column"}`}
              >
                <InputText
                  id="BookerNameInput"
                  mr={isPhabletDown ? undefined : "no"}
                  disabled={allReadOnly}
                  {...bookingNameHook}
                  label={LANG("booker")}
                  placeholder={LANG("booker")}
                />
                <InputText
                  id="BookerPhoneInput"
                  mr={isPhabletDown ? undefined : "no"}
                  disabled={allReadOnly}
                  {...bookingPhoneHook}
                  validation={isPhone}
                  hyphen
                  label={LANG("phoneNumber")}
                  placeholder={LANG("phoneNumber")}
                  icon="sms"
                  iconHover
                  iconOnClick={handleSmsIconClick}
                />
                <SelectBox
                  id="FunnelSelect"
                  mr={isPhabletDown ? undefined : "no"}
                  disabled={allReadOnly}
                  {...funnelStatusHook}
                  options={FUNNELS_OP}
                  label={LANG("funnels")}
                />
              </div>
            </div>
            <div className="modal__section flex-grid__col  ">
              <h5>{LANG("payment_info")}</h5>
              <div
                className={`JDflex JDflex--oneone ${isPhabletDown ||
                  "JDflex--column"}`}
              >
                <InputText
                  id="PriceHook"
                  mr={isPhabletDown ? undefined : "no"}
                  disabled={allReadOnly}
                  placeholder={`${LANG("normal_price")}:${autoComma(
                    placeHolederPrice
                  )}`}
                  comma
                  label={LANG("total_price")}
                  {...priceHook}
                  value={toNumber(priceHook.value)}
                />
                <SelectBox
                  id="PayMethodSelect"
                  mr={isPhabletDown ? undefined : "no"}
                  disabled={allReadOnly}
                  {...payMethodHook}
                  options={PAYMETHOD_FOR_HOST_OP}
                  label={LANG("method_of_payment")}
                />
                <SelectBox
                  mr={isPhabletDown ? undefined : "no"}
                  disabled={allReadOnly}
                  {...paymentStatusHook}
                  options={PAYMENT_STATUS_OP}
                  label={LANG("payment_status")}
                />
              </div>
            </div>
            <div className="flex-grid__col modal__section">
              <h5>
                {LANG("reservation_information")}{" "}
                {/* <Drawer size={"small"} {...assigInfoDrawHook} /> */}
              </h5>
              <div
                className={`JDflex JDflex--oneone ${isPhabletDown ||
                  "JDflex--column"}`}
              >
                <SelectBox
                  mr={isPhabletDown ? undefined : "no"}
                  disabled={allReadOnly}
                  {...bookingStatusHook}
                  options={BOOKING_STATUS_OP}
                  label={LANG("booking_status")}
                />
                <JDdayPicker
                  mr={isPhabletDown ? undefined : "no"}
                  displayIcon={false}
                  inputDisabled={allReadOnly}
                  canSelectBeforeDay={false}
                  {...resvDateHook}
                  mode="input"
                  className="JDstandard-space"
                  readOnly
                  label={LANG("date_of_stay")}
                />
                <InputText
                  mr={isPhabletDown ? undefined : "no"}
                  disabled={allReadOnly}
                  readOnly
                  value={moment(createdAt || undefined)
                    .local()
                    .format(DateFormat.WITH_TIME)}
                  label={LANG("reservation_date")}
                  placeholder={LANG("reservation_date")}
                />
              </div>
            </div>
            <div className="flex-grid__col modal__section">
              <h5>{LANG("room_assig_info")}</h5>
              <JDLabel txt={LANG("people_and_room_info")} />
              <RoomSelectInfoTable roomSelectInfo={roomSelectInfo} />
              {mode !== "CREATE" && (
                <Fragment>
                  <JDLabel txt={LANG("assig_info")} />
                  <RoomAssigedInfoTable
                    setAssigInfo={setAssigInfo}
                    assigInfo={assigInfo}
                    guestsData={guests || []}
                  />
                </Fragment>
              )}
            </div>
            <div className="JDz-index-1 modal__section flex-grid__col  ">
              <h5>{LANG("else")}</h5>
              <InputText
                disabled={allReadOnly}
                {...memoHook}
                halfHeight
                textarea
                label={LANG("memo")}
              />
            </div>
          </div>
          <div className="JDmodal__endSection">
            <Button
              id="BookingModalCreateBtn"
              size="small"
              label={LANG("do_create")}
              disabled={!isCreateMode}
              thema="primary"
              mode="flat"
              onClick={handleCreateBtnClick}
              tabIndex={0}
            />
            <Button
              id="BookingModalUpdateBtn"
              mode="flat"
              size="small"
              disabled={isCreateMode}
              label={LANG("do_modify")}
              thema="primary"
              onClick={handleUpdateBtnClick}
            />
            <Button
              id="BookingModalDeleteBtn"
              mode="flat"
              size="small"
              label={LANG("delete_booking")}
              disabled={isCreateMode}
              thema="error"
              onClick={handleDeletBtnClick}
            />
          </div>
        </Fragment>
      )}
      <SendSMSmodalWrap context={context} modalHook={sendSmsModalHook} />
      <JDtoastModal
        confirm
        confirmCallBackFn={deleteModalCallBackFn}
        {...confirmModalHook}
      />
    </Modal>
  );
};

export default BookingModal;

// ℹ️ 배정달력 예약생성 플로우
// 배정 달력 선택정보 -> 예약정보로 변환(Booking) -> 배정정보로 변환(Guest 하나당 배정정보) -> (예약정보 및 방배정) 정보로 변환
