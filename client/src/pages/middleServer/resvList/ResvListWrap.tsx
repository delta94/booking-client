import React, {useState, Fragment} from "react";
import {Query, Mutation} from "react-apollo";
import ResvList from "./ResvList";
import {IHouse} from "../../../types/interface";
import {
  getBookings,
  getBookingsVariables,
  updateBooking,
  updateBookingVariables,
  deleteBooking,
  deleteBookingVariables
} from "../../../types/api";
import {
  showError,
  queryDataFormater,
  onCompletedMessage
} from "../../../utils/utils";
import {GET_BOOKINGS, DELETE_BOOKING, UPDATE_BOOKING} from "../../../queries";
import {getOperationName} from "apollo-link";
import {usePagiNation} from "../../../actions/hook";
import Preloader from "../../../atoms/preloader/Preloader";
import {isNetworkRequestInFlight} from "apollo-client/core/networkStatus";

interface IProps {
  houseId: string;
}

class UpdateBookingMu extends Mutation<updateBooking, updateBookingVariables> {}
class DeleteBookingMu extends Mutation<deleteBooking, deleteBookingVariables> {}
class GetBookingsQuery extends Query<getBookings, getBookingsVariables> {}

const ResvListWrap: React.FC<IProps> = ({houseId}) => {
  const [page, setPage] = usePagiNation(1);

  return (
    <GetBookingsQuery
      query={GET_BOOKINGS}
      pollInterval={4000}
      notifyOnNetworkStatusChange
      variables={{houseId, page, count: 20}}
    >
      {({data: boookerData, loading, error, networkStatus}) => {
        showError(error);

        console.log(networkStatus);
        const bookings = queryDataFormater(
          boookerData,
          "GetBookings",
          "bookings",
          undefined
        );
        const pageInfo = queryDataFormater(
          boookerData,
          "GetBookings",
          "pageInfo",
          undefined
        );

        return (
          <DeleteBookingMu
            mutation={DELETE_BOOKING}
            refetchQueries={[getOperationName(GET_BOOKINGS) || ""]}
            onCompleted={({DeleteBooking}) => {
              onCompletedMessage(
                DeleteBooking,
                "예약 삭제 완료",
                "예약 삭제 실패"
              );
            }}
          >
            {(deleteBookingMu, {loading: deleteBookingLoading}) => (
              <UpdateBookingMu
                mutation={UPDATE_BOOKING}
                refetchQueries={[getOperationName(GET_BOOKINGS) || ""]}
                onCompleted={({UpdateBooking}) => {
                  onCompletedMessage(
                    UpdateBooking,
                    "예약 업데이트",
                    "예약 업데이트 실패"
                  );
                }}
              >
                {(updateBookingMu, {loading: updateBookingLoading}) => (
                  <Fragment>
                    <ResvList
                      houseId={houseId}
                      pageInfo={pageInfo || undefined}
                      bookingsData={bookings || []}
                      deleteBookingMu={deleteBookingMu}
                      updateBookingMu={updateBookingMu}
                      updateBookingLoading={updateBookingLoading}
                      deleteBookingLoading={deleteBookingLoading}
                      setPage={setPage}
                      loading={isNetworkRequestInFlight(networkStatus)}
                    />
                    <Preloader page loading={networkStatus === 1} />
                  </Fragment>
                )}
              </UpdateBookingMu>
            )}
          </DeleteBookingMu>
        );
      }}
    </GetBookingsQuery>
  );
};

export default ResvListWrap;
