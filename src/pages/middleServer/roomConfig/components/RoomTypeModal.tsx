/* eslint-disable react/prop-types */
import {MutationFn} from "react-apollo";
import React, {useState, Fragment, useEffect} from "react";
import {toast} from "react-toastify";
import Modal from "../../../../atoms/modal/Modal";
import SelectBox, {
  IselectedOption
} from "../../../../atoms/forms/selectBox/SelectBox";
import InputText from "../../../../atoms/forms/inputText/InputText";
import Button from "../../../../atoms/button/Button";
import JDLabel from "../../../../atoms/label/JDLabel";
import ImageUploader from "../../../../atoms/imageUploader/ImageUploader";
import {
  PricingTypeKr,
  RoomGenderKr,
  MAX_PEOPLE_COUNT_OP_FN,
  ROOM_GENDER_OP,
  PRICING_TYPE_OP
} from "../../../../types/enum";
import {IUseModal, useImageUploader, useModal} from "../../../../hooks/hook";
import {
  createRoomType,
  createRoomTypeVariables,
  deleteRoomType,
  deleteRoomTypeVariables,
  updateRoomType,
  updateRoomTypeVariables,
  getRoomTypeById_GetRoomTypeById_roomType as IRoomType
} from "../../../../types/api";
import {IDefaultRoomType, IRoomTypeModalInfo} from "./RoomTypeModalWrap";
import Preloader from "../../../../atoms/preloader/Preloader";
import {IContext} from "../../../MiddleServerRouter";
import PriceWarnModal from "../../../../components/priceWarnModal.tsx/PriceWarnModal";

interface IProps {
  context: IContext;
  createRoomTypeMutation: MutationFn<createRoomType, createRoomTypeVariables>;
  deleteRoomTypeMutation: MutationFn<deleteRoomType, deleteRoomTypeVariables>;
  updateRoomTypeMutation: MutationFn<updateRoomType, updateRoomTypeVariables>;
  onCreateFn?: any;
  onUpdateFn?: any;
  onDelteFn?: any;
  loading: boolean;
  isAddMode?: boolean;
  mutationLoading: boolean;
  modalHook: IUseModal<IRoomTypeModalInfo>;
  roomTypeData: IRoomType | IDefaultRoomType;
}

const RoomTypeModal: React.SFC<IProps> = ({
  modalHook,
  context,
  loading,
  isAddMode,
  mutationLoading,
  onCreateFn,
  onUpdateFn,
  onDelteFn,
  createRoomTypeMutation,
  deleteRoomTypeMutation,
  updateRoomTypeMutation,
  roomTypeData
}) => {
  const {house} = context;
  const priceWarnModal = useModal(false);
  const roomImageHook = useImageUploader();
  const [value, setValue] = useState({
    name: roomTypeData.name,
    description: roomTypeData.description,
    pricingType: {
      label: PricingTypeKr[roomTypeData.pricingType],
      value: roomTypeData.pricingType
    },
    peopleCount: {
      label: `${roomTypeData.peopleCount}명`,
      value: roomTypeData.peopleCount
    },
    roomGender: {
      label: RoomGenderKr[roomTypeData.roomGender],
      value: roomTypeData.roomGender
    },
    peopleCountMax: {
      label: `${roomTypeData.peopleCountMax}명`,
      value: roomTypeData.peopleCountMax
    },
    defaultPrice: roomTypeData.defaultPrice || 0
  });

  const updateRoomTypeValue = {
    houseId: house._id,
    name: value.name,
    img: roomImageHook.fileUrl || undefined,
    pricingType: value.pricingType.value,
    roomGender: value.roomGender.value,
    peopleCount: value.peopleCountMax.value,
    peopleCountMax: value.peopleCountMax.value,
    description: value.description,
    defaultPrice: value.defaultPrice
  };

  // const [peopleCountOption, setPeopleCountOption] = useState<IselectedOption[]>([]);

  const validater = () => {
    if (value)
      if (value.name === "") {
        toast.warn("방타입명을 입력해주세요.");
        return false;
      }
    if (value.peopleCountMax.value < 1) {
      toast.warn("수용인원은 1명 이상이여야 합니다.");
      return false;
    }
    if (value.defaultPrice < 1000) {
      priceWarnModal.openModal({
        confirmCallBackFn: createRoomType
      });
      return false;
    }
    return true;
  };

  const onCreateRoomType = async () => {
    if (validater()) {
      createRoomType();
    }
  };

  const createRoomType = (flag?: boolean) => {
    if (flag === false) return;
    onCreateFn && onCreateFn();
    createRoomTypeMutation({
      variables: {
        ...updateRoomTypeValue
      }
    });
    modalHook.closeModal();
  };

  const onDeleteRoomType = async () => {
    deleteRoomTypeMutation();
    modalHook.closeModal();
  };

  const onUpdateRoomType = async () => {
    if (validater()) {
      updateRoomTypeMutation({
        variables: {
          params: {
            defaultPrice: updateRoomTypeValue.defaultPrice,
            description: updateRoomTypeValue.description,
            img: updateRoomTypeValue.img,
            name: updateRoomTypeValue.name,
            peopleCount: updateRoomTypeValue.peopleCountMax,
            peopleCountMax: updateRoomTypeValue.peopleCountMax
          },
          roomTypeId: modalHook.info.roomTypeId || ""
        }
      });
      modalHook.closeModal();
    }
  };

  const onChangePeople = (inValue: any) => {
    setValue({...value, peopleCountMax: inValue});
  };

  const maxPeopleCountOption = MAX_PEOPLE_COUNT_OP_FN();

  const pricingTypeOptions = PRICING_TYPE_OP;

  const genderOptions = ROOM_GENDER_OP;

  return (
    <Modal
      overlayClassName="Overlay"
      center={false} // 이거 제거 필요
      className="Modal"
      {...modalHook}
      style={{
        content: {
          maxWidth: "600px"
        }
      }}
    >
      {loading || mutationLoading ? (
        <Preloader loading={loading || mutationLoading} size="large" />
      ) : (
        <Fragment>
          <div className="flex-grid">
            <div className="flex-grid__col col--full-6 col--lg-6 col--md-12">
              <InputText
                label="방타입이름"
                value={value.name}
                onChange={(inValue: any) => {
                  setValue({...value, name: inValue});
                }}
              />
            </div>
            <div className="JDz-index-3 flex-grid__col JDz-index-3 col--full-6 col--lg-6 col--md-12">
              <SelectBox
                label="수용인원"
                disabled={false}
                onChange={onChangePeople}
                options={maxPeopleCountOption}
                selectedOption={value.peopleCountMax}
              />
            </div>
            <div className="flex-grid__col JDz-index-2 col--full-6 col--lg-6 col--md-12">
              <SelectBox
                label="방타입선택"
                disabled={!isAddMode}
                onChange={(inValue: any) => {
                  setValue({...value, pricingType: inValue});
                }}
                options={pricingTypeOptions}
                selectedOption={value.pricingType}
              />
            </div>
            <div className="flex-grid__col JDz-index-2 col--full-6 col--lg-6 col--md-12">
              <SelectBox
                label="방성별선택"
                disabled={!isAddMode}
                onChange={(inValue: any) => {
                  setValue({...value, roomGender: inValue});
                }}
                options={genderOptions}
                selectedOption={value.roomGender}
              />
            </div>
            <div className="flex-grid__col flex-grid__col--vertical col--full-12 col--lg-12 col--md-12">
              <JDLabel txt="방사진" />
              <ImageUploader {...roomImageHook} minHeight="200px" />
            </div>
            <div className="flex-grid__col col--full-6 col--lg-6 col--md-6">
              <InputText
                onChange={(inValue: any) => {
                  setValue({...value, description: inValue});
                }}
                value={value.description}
                textarea
                label="방타입 추가설명"
              />
            </div>
            <div className="flex-grid__col col--full-6 col--lg-6 col--md-6">
              <InputText
                onChange={(inValue: any) => {
                  setValue({...value, defaultPrice: inValue});
                }}
                comma
                value={value.defaultPrice}
                label="방 기본가격"
              />
              <p className="JDsmall-text">
                * 가격이 설정되어 있지 않은 기간 에서 기본으로 적용됨
              </p>
            </div>
          </div>
          <div className="JDmodal__endSection">
            <Button
              thema="primary"
              label={isAddMode ? "생성하기" : "복제하기"}
              size="small"
              onClick={onCreateRoomType}
            />
            <Button
              thema="primary"
              label="수정하기"
              size="small"
              disabled={isAddMode}
              onClick={onUpdateRoomType}
            />
            <Button
              thema="error"
              label="삭제하기"
              size="small"
              disabled={isAddMode}
              onClick={onDeleteRoomType}
            />
            {/* <Button label="닫기"  onClick={modalHook.closeModal} /> */}
          </div>
          <PriceWarnModal modalHook={priceWarnModal} />
        </Fragment>
      )}
    </Modal>
  );
};

export default RoomTypeModal;