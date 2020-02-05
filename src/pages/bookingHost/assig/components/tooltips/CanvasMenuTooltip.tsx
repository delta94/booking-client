import React from "react";
import Button from "../../../../../atoms/button/Button";
import {
  IAssigTimelineUtils,
  IAssigTimelineContext,
  IAssigTimelineHooks
} from "../assigIntrerface";
import { startBooking_StartBooking } from "../../../../../types/api";
import { LANG } from "../../../../../hooks/hook";
import { ToastContainer, toast } from "react-toastify";

interface IProps {
  assigHooks: IAssigTimelineHooks;
  assigUtils: IAssigTimelineUtils;
  assigContext: IAssigTimelineContext;
}

const CanvasMenuTooltip: React.FC<IProps> = ({
  assigHooks: {},
  assigUtils: {
    hilightGuestBlock,
    changeMarkToGhost,
    addBlock,
    getInfoesFromMarks,
    startBookingModalWithMark,
    allTooltipsHide,
    markValidation
  }
}) => {
  const { groupIds, end, start } = getInfoesFromMarks();

  const onStartBookingStart = () => {
    changeMarkToGhost();
  };

  const bookingCallBack = async (
    result: "error" | startBooking_StartBooking
  ) => {
    if (result === "error") return;

    hilightGuestBlock({ bookingId: result.booking?._id });
  };

  const validater = () => {
    if (!markValidation()) {
      toast.error(LANG("drag_failed_msg"));
      return false;
    } else {
      return true;
    }
  };

  const createBtnHandler = () => {
    if (validater())
      startBookingModalWithMark({
        startBookingCallBack: bookingCallBack,
        onStartBookingStart
      });
  };

  return (
    <div className="assig__tooltips canvasMenu tooltipList" id="canvasMenu">
      <ul>
        <li>
          <Button
            label={LANG("create_booking")}
            onClick={e => {
              allTooltipsHide();
              e.stopPropagation();
              createBtnHandler();
            }}
          />
        </li>
        <li>
          <Button
            onClick={() => {
              allTooltipsHide();
              if (validater()) {
                addBlock(start, end, groupIds);
              }
            }}
            label={LANG("block_room")}
          />
        </li>
      </ul>
    </div>
  );
};

export default CanvasMenuTooltip;
