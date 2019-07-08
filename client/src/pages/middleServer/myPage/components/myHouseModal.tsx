import React, {Fragment} from "react";
import {toast} from "react-toastify";
import {MutationFn} from "react-apollo";
import Modal from "../../../../atoms/modal/Modal";
import Button from "../../../../atoms/button/Button";
import {IUseModal} from "../../../../actions/hook";
import {IHouse} from "../../../../types/interface";
import Preloader from "../../../../atoms/preloader/Preloader";
import {getHouse_GetHouse_house} from "../../../../types/api";
import {PricingType} from "../../../../types/enum";
import JDIcon, {IIcons, IconSize} from "../../../../atoms/icons/Icons";
import moment from "moment";
import {isEmpty} from "../../../../utils/utils";
import copytoClipboard from "../../../../utils/copyToClipboard";

interface IProps {
  modalHook: IUseModal;
  deleteMu: MutationFn<any, any>;
  houseChangeMu: MutationFn<any, any>;
  house: getHouse_GetHouse_house | undefined | null;
  loading: boolean;
}

const MyHouseModal: React.SFC<IProps> = ({
  houseChangeMu,
  deleteMu,
  modalHook,
  house,
  loading
}) => {
  const onDelete = () => {
    if (house && house.product) {
      toast("상품을 먼저 해지 해주세요.");
      return false;
    }
    deleteMu();
    modalHook.closeModal();
    return false;
  };

  let roomCountDomitory = 0;
  let roomCountRoom = 0;
  house &&
    house.roomTypes &&
    house.roomTypes.forEach(roomType => {
      if (roomType.pricingType === PricingType.DOMITORY) {
        roomCountDomitory += roomType.roomCount;
      } else {
        roomCountRoom += roomType.roomCount;
      }
    });

  return loading ? (
    <Preloader />
  ) : (
    <Modal {...modalHook}>
      <Fragment>
        {house && (
          <Fragment>
            <p>숙소명: {house.name}</p>
            <p>
              생성일시: {moment(house!.createdAt).format("YYYY-MM-DD HH:mm")}
            </p>
            <p>도미토리: {roomCountDomitory}</p>
            <p>방: {roomCountRoom}</p>
            <p
              onClick={e =>
                copytoClipboard(
                  `https://app.stayjanda.com/#/outpage/reservation/${
                    house.publicKey
                  }`
                )
              }
            >
              {house.product !== null && house.product.name !== "상품1"
                ? "예약페이지 URL 복사 "
                : "예약페이지를 불러올수 없습니다. 상품을 구매해주세요"}
              <JDIcon
                size={IconSize.MEDEIUM_SMALL}
                icon={"copyFile"}
                hover={true}
              />
            </p>
          </Fragment>
        )}
      </Fragment>
      <div className="JDmodal__endSection">
        <Button onClick={onDelete} thema="warn" mode="flat" label="삭제" />
      </div>
    </Modal>
  );
};

export default MyHouseModal;
