import React, { useState } from "react";
import ErrProtecter from "../../../utils/errProtect";
import "./CheckReservation.scss";
import { useQuery } from "@apollo/react-hooks";
import {
  getBookingForPublic,
  getBookingForPublicVariables,
  getHouseForPublic,
} from "../../../types/api";
import { queryDataFormater, onCompletedMessage } from "../../../utils/utils";
import {
  GET_BOOKING_FOR_PUBLIC,
  GET_HOUSE_FOR_PUBLIC,
  SEARCH_BOOKING
} from "../../../apollo/queries";
import { RouteComponentProps } from "react-router-dom";
import client from "../../../apollo/apolloClient";
import CheckReservation from "./CheckReservation";
import JDmodal from "../../../atoms/modal/Modal";
import { useModal, LANG } from "../../../hooks/hook";
import CompleteCircle from "../../../components/completeCircle/CompleteCircle";
import { langVarChange } from "../../../utils/langVarChange";
export interface ISetBookingInfo
  extends React.Dispatch<React.SetStateAction<any>> { }

export interface ICheckParams {
  publickey: string;
  name: string;
  phoneNumber: string;
  password: string;
  completed?: string;
}

interface IProps extends RouteComponentProps<ICheckParams> { }

const CheckReservationWrap: React.FC<IProps> = ({
  match: {
    params: { password, name, phoneNumber, publickey, completed }
  }
}) => {
  sessionStorage.setItem("hpk", publickey);
  const comeplteModalHook = useModal(false);

  const { data: houseData } = useQuery<getHouseForPublic>(
    GET_HOUSE_FOR_PUBLIC,
    {
      client,
      skip: publickey === undefined
    }
  );

  if (completed)
    comeplteModalHook.openModal();

  const publicHouseInfo =
    queryDataFormater(houseData, "GetHouseForPublic", "house", undefined) ||
    undefined;

  langVarChange(publicHouseInfo?.tags || []);

  return (
    <div>
      {/* 예약확인 관련된 뷰 */}
      <CheckReservation
        houseData={publicHouseInfo}
      />
      <JDmodal center {...comeplteModalHook}>
        <div>
          <div className="JDstandard-margin-bottom">
            {LANG("reservation_is_completed")}
          </div>
          {/* 예약완료 에니메이션 */}
          <CompleteCircle />
        </div>
      </JDmodal>
    </div>
  );
};

export default ErrProtecter(CheckReservationWrap);
