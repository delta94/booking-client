/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Reservation from "./Reservation";
import $ from "jquery";
import { onCompletedMessage } from "../../../utils/utils";
import {
  startBooking_StartBooking,
  startBookingForPublic,
  startBookingForPublicVariables,
  getPaymentAuth,
  getPaymentAuthVariables
} from "../../../types/api";
import {
  START_BOOKING_FOR_PUBLIC,
  GET_PAYMENT_AUTH
} from "../../../apollo/queries";
import { IUseModal } from "../../../hooks/hook";
import { isInIfram } from "../../../utils/isInIfram";
import { IContext } from "../../bookingHost/BookingHostRouter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import client from "../../../apollo/apolloClient";

export interface IReservationWrapProps {
  publicKey?: string;
  // context가 존재하면 Host가 한 예약
  context?: IContext;
  modalHook?: IUseModal;
  callBackCreateBookingMu?: (CreateBooking: startBooking_StartBooking) => void;
}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const ReservationWrap: React.FC<IReservationWrapProps &
  RouteComponentProps<any>> = ({
  match,
  publicKey,
  context,
  modalHook,
  callBackCreateBookingMu
}) => {
  // hpk 를 URL로 부터 받아 헤더에 셋팅
  sessionStorage.setItem("hpk", publicKey || match.params.publickey);

  // 스타트부킹(게스트)
  const [
    startBookingForPublicMu,
    { loading: startBookingLoading }
  ] = useMutation<startBookingForPublic, startBookingForPublicVariables>(
    START_BOOKING_FOR_PUBLIC,
    {
      client,
      awaitRefetchQueries: true,
      onCompleted: ({ StartBookingForPublic }) => {
        process.env.NODE_ENV === "development" &&
          onCompletedMessage(
            StartBookingForPublic,
            "개발 메세지: StartBooking Sucess",
            "개발 메세지: StartBooking Fail"
          );
        startBookingCallBackFn(StartBookingForPublic);
      }
    }
  );
  // 페이 인증
  const { refetch: payAuthQu } = useQuery<
    getPaymentAuth,
    getPaymentAuthVariables
  >(GET_PAYMENT_AUTH, { client, skip: true });

  const startBookingCallBackFn = (result: any) => {
    modalHook && modalHook.closeModal();
    callBackCreateBookingMu && callBackCreateBookingMu(result);
  };

  if (isInIfram()) {
    $("html").addClass("inIframe");
  }

  return (
    <div>
      <Reservation
        context={context}
        startBookingForPublicMu={startBookingForPublicMu}
        payAuthQu={payAuthQu}
        createLoading={startBookingLoading}
        reservationModalHook={modalHook}
      />
    </div>
  );
};

export default ReservationWrap;

// 🚁 iFrame 에서 상위페이지를 Redirect 하는 방법 [https://help.surveygizmo.com/help/break-out-of-iframe];

// ⭐️⭐️ ⭐️⭐️ ⭐️⭐️ ⭐️⭐️ ⭐️⭐️  IFRAME 코드 IFRAME 코드 IFRAME 코드
// {
/* 
<iframe id="JD_RESV_APP" style="border:none;min-height:400px" scrolling="no" title="JDqna" src="http://localhost:3000/#/outpage/reservation/c61bf04b-446b-7907-54d5-d509147ca39e" width="100%" height="1500px"></iframe>

<script>
window.addEventListener('message', function(e) {
  console.log(e.data); 
  if(e.data.height) {
    jQuery('#JD_RESV_APP').height(e.data.height);
 }
})
</script>
  */
// }
