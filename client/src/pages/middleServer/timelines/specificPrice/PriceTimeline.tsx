import React from 'react';
import 'moment/locale/ko';
import { MutationFn } from 'react-apollo';
import { Link } from 'react-router-dom';
import Timeline from '../../../../components/timeline/Timeline';
import ErrProtecter from '../../../../utils/ErrProtecter';
import Button from '../../../../atoms/button/Button';
import './PriceTimeline.scss';
import {
  getAllRoomTypePrice_GetAllRoomType_roomTypes as IRoomType,
  createRoomPrice,
  createRoomPriceVariables,
} from '../../../../types/api';
import { ADD_ROOM } from '../ModifyTimelineWrap';
import Preloader from '../../../../atoms/preloader/Preloader';
import isLastRendered from '../components/timelineUtils';
import { IItem } from './PriceTimelineWrap';
import InputText from '../../../../atoms/forms/InputText';

const LAST_ROOMTYPE: any = 'unRendered'; // 방들중에 방타입이 다른 마지막을 체크할것

interface IProps {
  items: IItem[] | undefined;
  houseId: string;
  priceMap: Map<any, any>;
  defaultProps: any;
  timelineProps?: any;
  loading: boolean;
  roomTypesData: IRoomType[] | undefined;
  createRoomPriceMu: MutationFn<createRoomPrice, createRoomPriceVariables>;
}

const ModifyTimeline: React.SFC<IProps> = ({
  items,
  defaultProps,
  roomTypesData,
  loading,
  createRoomPriceMu,
  houseId,
  priceMap,
  ...timelineProps
}) => {
  // 그룹 렌더
  const ModifyGroupRendererFn = ({ group }: any) => {
    const roomType: IRoomType | undefined = roomTypesData && roomTypesData[group.roomTypeIndex];

    //  룹타입 부분 렌더할지 체크
    return (
      <div key={group._id}>
        <span className="title">{group.name}</span>
      </div>
    );
  };

  const onInputBlur = (value: string, item: IItem) => {
    const inValue = parseInt(value, 10);

    // ❓ 뭔가 잘못됨 이부분에 관해서는... 항상 값이 있어야하는데

    //  ❗️ 알겠다 값이 없을떄는 deleteRoomPriceMu를 날려야함 남은 부분이 PLcae Holder로 매워져 있을수 있도록

    // ⛔️ 뮤테이션 문제가있음  4월 28일 이후로 안들어감 이게뭐냥...

    if (priceMap.get(item.id) !== inValue) {
      createRoomPriceMu({
        variables: {
          houseId,
          date: item.start,
          roomTypeId: item.group,
          price: inValue || 0,
        },
      });
      priceMap.set(item.id, inValue);
    }
  };

  // 아이템 렌더
  const itemRendererFn = ({
    item, itemContext, getItemProps, getResizeProps,
  }: any) => {
    const props = getItemProps(item.itemProps);
    console.log('item');
    console.log(item);
    return (
      <div style={{ ...props.style, backgroundColor: 'transparent', border: 'none' }}>
        <InputText
          defaultValue={priceMap.get(item.id)}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            onInputBlur(e.currentTarget.value, item);
          }}
        />
      </div>
    );
  };
  // 사이드 탑 렌더

  const handleItemClick = () => {};

  // Calendar methods
  const handleCanvasClick = (groupId: any, time: any, event: any) => {
    window.alert(`Canvas clicked ${groupId} ${time}`);
  };

  const modifySideBarRendererFn = () => <div className="modify__sideTop" />;

  return (
    <div id="specificPrice" className="specificPrice container container--full">
      <div className="docs-section">
        <InputText />
        <div className="flex-grid flex-grid--end">
          <div className="flex-grid__col col--full-4 col--lg-4 col--md-6">
            <h3>방생성 및 수정</h3>
          </div>
        </div>
        <div className="ModifyTimeline__timelineWrapScroll">
          <div className="ModifyTimeline__timelineWrap specificPrice__timeline">
            <Timeline
              {...defaultProps}
              {...timelineProps}
              items={items || []}
              groups={roomTypesData || []}
              onItemClick={handleItemClick}
              onCanvasClick={handleCanvasClick}
              itemRenderer={itemRendererFn}
              groupRenderer={ModifyGroupRendererFn}
              sidebarContent={modifySideBarRendererFn()}
            />
            {loading && <Preloader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrProtecter(ModifyTimeline);