import React, {Fragment} from "react";
import {showError} from "../../utils/utils";
import DailyAssig from "./DailyAssig";
import {Query} from "react-apollo";
import {
  getAllRoomTypeWithGuestVariables,
  getAllRoomTypeWithGuest
} from "../../types/api";
import {GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM} from "../../queries";
import {IHouse} from "../../types/interface";
import {BookingStatus} from "../../types/enum";
import {queryDataFormater} from "../../utils/utils";
import moment from "moment";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import {useDayPicker} from "../../actions/hook";
import JDIcon from "../../atoms/icons/Icons";

class GetAllRoomTypeWithGuestQuery extends Query<
  getAllRoomTypeWithGuest,
  getAllRoomTypeWithGuestVariables
> {}

interface IProps {
  house: IHouse;
  date: Date;
}

const DailyAssigWrap: React.FC<IProps> = ({date, house}) => {
  const dayPickerHook = useDayPicker(date, date);
  const {houseConfig, _id: houseId} = house;
  const updateVariables = {
    houseId: houseId,
    start: dayPickerHook.from || new Date(),
    end: moment(dayPickerHook.from || new Date()).add(1, "day")
  };

  return (
    <GetAllRoomTypeWithGuestQuery
      pollInterval={
        houseConfig.pollingPeriod ? houseConfig.pollingPeriod.period : undefined
      }
      query={GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM}
      variables={{
        ...updateVariables,
        bookingStatus: BookingStatus.COMPLETE
      }}
    >
      {({data, loading, error}) => {
        showError(error);
        const roomTypesData = queryDataFormater(
          data,
          "GetAllRoomType",
          "roomTypes",
          undefined
        ); // 원본데이터
        const guestsData = queryDataFormater(
          data,
          "GetGuests",
          "guests",
          undefined
        ); // 원본데이터

        return (
          <Fragment>
            <DailyAssig
              house={house}
              loading={loading}
              guestsData={guestsData || []}
              dayPickerHook={dayPickerHook}
              roomTypesData={roomTypesData || []}
            />
          </Fragment>
        );
      }}
    </GetAllRoomTypeWithGuestQuery>
  );
};

export default DailyAssigWrap;