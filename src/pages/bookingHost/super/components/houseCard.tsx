import React from "react";
import moment from "moment";
import {IUseModal, useModal, LANG} from "../../../../hooks/hook";
import Card from "../../../../atoms/cards/Card";
import ProfileCircle from "../../../../atoms/profileCircle/ProfileCircle";
import Button from "../../../../atoms/button/Button";
import Badge from "../../../../atoms/badge/Badge";
import {autoHypen} from "../../../../utils/utils";
import JDmodal from "../../../../atoms/modal/Modal";
import SpecificAtionWrap from "../../../../components/specification/SpecificationWrap";
import {getHousesForSU_GetHousesForSU_houses} from "../../../../types/api";
import JDIcon, {IconSize} from "../../../../atoms/icons/Icons";
import {ICreateNotiModalParam} from "./createNotiModalWrap";

interface IProps {
  userModal: IUseModal;
  houseData: getHousesForSU_GetHousesForSU_houses;
  NotiModalHook: IUseModal<ICreateNotiModalParam>;
}

const HouseCard: React.SFC<IProps> = ({
  userModal,
  houseData,
  NotiModalHook
}) => {
  const specificationModalHook = useModal(false);
  const getBadgeInfo = () => {
    const badgeInfoes = [];

    const {createdAt, updatedAt} = houseData;

    if (moment(createdAt).isAfter(moment().subtract(1, "days"))) {
      badgeInfoes.push({thema: "new", label: "new"});
    }
    if (
      moment(updatedAt).isAfter(moment().subtract(1, "days")) &&
      !moment(createdAt).isSame(updatedAt, "day")
    ) {
      badgeInfoes.push({thema: "primary", label: "update"});
    }
    return badgeInfoes;
  };
  const badgeInfoes = getBadgeInfo();

  return (
    <Card className="houseCard">
      <ProfileCircle
        file={houseData.user.profileImg}
        onClick={() => {
          userModal.openModal({userId: houseData.user._id});
        }}
        size={IconSize.LARGE}
        className="houseCard__profile JDmargin-bottom0"
      />
      <div className="houseCard__contentsWrap">
        <div>
          <span className="JDlarge-text houseCard__houseName">
            {houseData.name}
          </span>
          <JDIcon
            onClick={() => {
              NotiModalHook.openModal({
                target: houseData.name,
                targetIds: [houseData._id]
              });
            }}
            hover
            size={IconSize.MEDEIUM_SMALL}
            icon="notify"
          />
          {badgeInfoes.map(badgeInfo => (
            <Badge thema={badgeInfo.thema as any}>{badgeInfo.label}</Badge>
          ))}
          <div className="houseCard__phoneNumber">
            {autoHypen(houseData.user.phoneNumber)}
          </div>
        </div>
        <div className="houseCard__product">
          {houseData.product ? (
            <Button
              mode="border"
              size="small"
              thema="grey"
              onClick={() => {
                specificationModalHook.openModal();
              }}
              label={houseData.product.name}
            />
          ) : (
            <Button
              mode="border"
              size="small"
              thema="grey"
              label={LANG("none_product")}
            />
          )}
        </div>
      </div>
      <JDmodal {...specificationModalHook}>
        <SpecificAtionWrap houseId={houseData._id} isAdmin={true} />
      </JDmodal>
    </Card>
  );
};

export default HouseCard;