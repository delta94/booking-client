import React, { Fragment, useMemo, useState, useEffect } from "react";

import { ErrProtecter } from "../../../utils/utils";
import Card from "../../../atoms/cards/Card";
import DailyAssigWrap from "../../../components/dailyAssjg/DailyAssigWrapWrap";
import "./DashBoard.scss";
import { useModal, useDayPicker, LANG } from "../../../hooks/hook";
import Button from "../../../atoms/button/Button";
import { IContext } from "../../bookingHost/BookingHostRouter";
import ReservationModal from "../../../components/reservationModala/ReservationModal";
import JDIcon from "../../../atoms/icons/Icons";
import TooltipList, {
  TooltipButtons
} from "../../../atoms/tooltipList/TooltipList";
import SendSMSmodalWrap from "../../../components/smsModal/SendSmsModalWrap";
import moment from "moment";
import PageHeader from "../../../components/pageHeader/PageHeader";
import PageBody from "../../../components/pageBody/PageBody";
import { DO_TUTO_KEY } from "../../../types/const";
import { IModalSMSinfo } from "../../../components/smsModal/SendSmsModal";
import { JDdayPickerModal } from "@janda-com/front";

interface Iprops {
  context: IContext;
}

// eslint-disable-next-line react/prop-types
const DashBoard: React.SFC<Iprops> = ({ context }) => {
  const reservationModal = useModal();
  const dayPickerModalHook = useModal();
  const smsModalHook = useModal<IModalSMSinfo>(false);
  const dailyAssigDateHook = useDayPicker(new Date(), new Date());
  const [loading, setLoading] = useState(true);
  const { house } = context;

  // const MemoDaySalesWrap = useMemo(
  //   () => <DaySalesWrap context={context} />,
  //   []
  // );

  // const MemoDayCheckInWrap = useMemo(
  //   () => <DayCheckInWrap context={context} />,
  //   []
  // );

  const MemoDailyAssigWrap =
    house.name !== "광안리" ? (
      useMemo(() => {
        return (
          <DailyAssigWrap
            onRederCallBack={() => {
              setLoading(false);
            }}
            calendarPosition="inside"
            context={context}
            date={dailyAssigDateHook.from || new Date()}
            key={"" + dailyAssigDateHook.from}
          />
        );
      }, [dailyAssigDateHook.from])
    ) : (
      <div />
    );

  const onToogleCardClick = () => {
    localStorage.removeItem(DO_TUTO_KEY);
  };

  return (
    <div id="dashboard" className="dashboard">
      <PageHeader title={LANG("JANDA_home")} desc={LANG("JANDA_home_desc")} />
      <PageBody>
        {/* {localStorage.getItem(DO_TUTO_KEY) && (
          <div>
            <JDcard onToogleCardClick={onToogleCardClick} toogleCard>
              <TutoHelper context={context} />
            </JDcard>
          </div>
        )} */}
        <div className="dashboard__section1">
          <div className="flex-grid">
            <div
              className={`flex-grid__col col--wmd-12
              col--full-12`}
            >
              {/* 상단 버튼 집합 */}
              <div>
                <Button
                  id="CreateResvModalUpBtn"
                  onClick={() => {
                    reservationModal.openModal();
                  }}
                  label={LANG("make_reservation")}
                  thema="primary"
                />
                <Button
                  onClick={() => {
                    smsModalHook.openModal({
                      receivers: []
                    });
                  }}
                  icon="sms"
                  label={LANG("send_sms")}
                />
              </div>
              <Card>
                <Fragment>
                  <div className="JDdisplay-none--wmdUp">
                    <h6>
                      {moment(dailyAssigDateHook.from || new Date()).format(
                        "YY.MM.DD."
                      )}
                    </h6>
                    {/* 데일리 어시그 컨트롤 툴팁 버튼 */}
                    <div className="dashboard__tooltipsWrap">
                      <span
                        data-event="click"
                        data-tip={true}
                        data-for="DailyAssigTooltip"
                      >
                        <JDIcon hover icon="dotMenuVertical" />
                      </span>
                    </div>
                  </div>
                  {MemoDailyAssigWrap}
                  <ReservationModal
                    context={context}
                    modalHook={reservationModal}
                    callBackCreateBookingMu={(foo: any) => {}}
                    publicKey={house.publicKey || undefined}
                  />
                </Fragment>
              </Card>
            </div>
          </div>
          {/* 통계 */}

          {/* {loading || (
            <div className="flex-grid flex-grid--start">
              <div className="flex-grid__col col--full-4 col--md-12 JDstandard-space">
                <Card className="dashboard__dailyStaticsCard">
                  <h6>{LANG("today_sales")}</h6>
                  {MemoDaySalesWrap}
                </Card>
              </div>
              <div className="flex-grid__col col--full-4 col--md-12">
                <Card className="dashboard__dailyStaticsCard flex-grid__col">
                  <h6>{LANG("checkin_status")}</h6>
                  {MemoDayCheckInWrap}
                </Card>
              </div>
            </div>
          )} */}
        </div>
      </PageBody>
      {/* 데일리 어시그 컨트롤 툴팁 */}
      <TooltipList id="DailyAssigTooltip">
        <TooltipButtons
          Buttons={[
            {
              label: LANG("make_reservation"),
              onClick: () => {
                reservationModal.openModal();
              }
            },
            {
              label: LANG("change_date"),
              onClick: () => {
                dayPickerModalHook.openModal();
              }
            }
          ]}
        />
      </TooltipList>
      <JDdayPickerModal
        modalHook={dayPickerModalHook}
        isRange={false}
        {...dailyAssigDateHook}
      />
      <SendSMSmodalWrap modalHook={smsModalHook} context={context} />
    </div>
  );
};

export default ErrProtecter(DashBoard);
