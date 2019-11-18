import $ from "jquery";
/* tslint:disable */
import Timeline, {
  // @ts-ignore
  SidebarHeader,
  // @ts-ignore
  DateHeader,
  // @ts-ignore
  TimelineHeaders,
  // @ts-ignore
  CustomHeader,
  defaultSubHeaderLabelFormats,
  defaultHeaderLabelFormats
} from "react-calendar-timeline";
import React, { useState, useEffect } from "react";
import "./Timeline.scss";
import moment from "moment";

// import 'react-calendar-timeline/lib/Timeline.css';
import ErrProtecter from "../../utils/errProtect";
import { TimePerMs } from "../../types/enum";
import JDIcon, { IconSize } from "../icons/Icons";
import { LANG, IUseModal } from "../../hooks/hook";
import { isEmpty } from "../../utils/utils";
import { THandleMouseDown } from "../../pages/middleServer/assig/components/assigIntrerface";

export interface IDotPoint {
  offsetX: number;
  offsetY: number;
  clientY: number;
  clientX: number;
  placeIndex: number;
  timeStart: number;
}

export interface IMoveCount {
  x: number;
  y: number;
}

// 변수설정
const ASSIG_IMELINE_HEIGHT = 40;
export { ASSIG_IMELINE_HEIGHT };

interface Iprops {
  handleMouseDownCanvas?: THandleMouseDown;
  hanldeOnKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  handleDraggingEnd?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleDraggingCell?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    moveCounts: IMoveCount,
    dotPoint: IDotPoint
  ) => void;
}

// 🍰 메인리턴
const JDtimeline: React.FC<Iprops> = ({
  onMouseDown,
  onMouseMove,
  handleDraggingEnd,
  handleMouseDownCanvas,
  handleDraggingCell,
  hanldeOnKeyDown,
  ...props
}: any) => {
  const [isActive, setIsActive] = useState(false);
  const defaultDotPoint = {
    offsetX: 0,
    clientY: 0,
    offsetY: 0,
    clientX: 0,
    placeIndex: 0,
    timeStart: 0
  };
  const [dotPoint, setDotPoint] = useState<IDotPoint>(defaultDotPoint);

  const oneDayWith = $(".timelineHeaderCell").width();
  const firstCell = $(`.timelineHeaderCell`)[0];
  const targetGroup = $(`.timelineHeaderCell div:first-child`);
  const cellHeight = $(".rct-hl-even.group").height() || 0;

  let firstCellLeft = 0;
  if (firstCell) {
    // @ts-ignore
    firstCellLeft = $(firstCell).position().left;
  }

  const toggleDraggingMode = (flag: boolean) => {
    $(
      ".react-calendar-timeline .rct-outer .rct-scroll .rct-horizontal-lines .group"
    ).css("cursor", flag ? "crosshair" : "");
    setIsActive(flag);
  };

  useEffect(() => {
    // 타임라인 밖까지 드래그했을경우 이벤트가 발생 하지않아서 여기배치
    // 마우스를 올리면
    const handleMouseUpCanvas = (e: any) => {
      if (isActive) {
        handleDraggingEnd(e);
      }
      toggleDraggingMode(false);
      setDotPoint(defaultDotPoint);
    };
    window.addEventListener("mouseup", handleMouseUpCanvas);
    return () => {
      window.removeEventListener("mouseup", handleMouseUpCanvas);
    };
  });

  return (
    <div
      onMouseMove={e => {
        e.persist();
        if (
          !oneDayWith ||
          !handleDraggingCell ||
          !isActive ||
          !dotPoint.clientX ||
          !dotPoint.clientY
        )
          return;
        const { clientX, clientY } = e.nativeEvent;
        const moveDiffX = clientX - dotPoint.clientX;
        const moveDiffY = clientY - dotPoint.clientY;

        const diffMovePoint =
          (dotPoint.offsetX + Math.abs(firstCellLeft)) % oneDayWith;
        const opositDiffMovePoint = oneDayWith - diffMovePoint;

        let moveCountX = 0;
        let moveCountY = 0;

        if (moveDiffX > 0 && moveDiffX > opositDiffMovePoint) {
          moveCountX =
            Math.floor((moveDiffX - opositDiffMovePoint) / oneDayWith) + 1;
        } else if (moveDiffX < 0 && Math.abs(moveDiffX) > diffMovePoint) {
          moveCountX = Math.ceil((moveDiffX + diffMovePoint) / oneDayWith) - 1;
        }

        const diffMovePointY = dotPoint.offsetY;
        const opositDiffMovePointY = cellHeight - diffMovePointY;

        if (moveDiffY > 0 && moveDiffY > opositDiffMovePointY) {
          moveCountY =
            Math.floor((moveDiffY - opositDiffMovePointY - 2) / cellHeight) + 1;
        } else if (moveDiffY < 0 && Math.abs(moveDiffY) > diffMovePointY) {
          moveCountY = Math.ceil((moveDiffY + diffMovePointY) / cellHeight) - 1;
        }

        handleDraggingCell(e, { x: moveCountX, y: moveCountY }, dotPoint);
        // 마우스가 움직인 양을 토대로 위아래 좌우 그룹을 선택상태로 만듬
      }}
      onMouseDown={e => {
        e.persist();
        const group = e.target;
        handleMouseDownCanvas && handleMouseDownCanvas(e);

        if (
          // 마우스 오른쪽버튼이 아니거나
          e.button !== 2 ||
          // 그룹이 올바르지 않거나
          !$(group).hasClass("group") ||
          // 원데이 위드가 없거나
          !oneDayWith ||
          isEmpty(targetGroup)
        )
          return;

        toggleDraggingMode(true);
        // scrollTarget.css("pointer-events", "none");

        const { offsetX, offsetY, clientY, clientX } = e.nativeEvent;

        const cellIndex =
          Math.floor((offsetX + Math.abs(firstCellLeft)) / oneDayWith) + 1;

        const theCell = targetGroup[cellIndex];

        // 해당 인덱스 또는 인덱스-1 "Tooltip"떄문
        let startTime = $(theCell).data("start");
        if (!startTime) startTime = $(targetGroup[cellIndex - 1]).data("start");
        if (!startTime) return;

        setDotPoint({
          offsetX,
          offsetY,
          clientY,
          clientX,
          placeIndex: $(group).index(),
          timeStart: startTime
        });
      }}
    >
      <Timeline id="react-calendar-timeline" {...props} />
    </div>
  );
};

// 또는 HeaderCellRedner 파일 참조
const krSubHeaderLabelFormats = Object.assign(
  {},
  defaultSubHeaderLabelFormats,
  {
    monthLong: `AMM ${LANG("month")}`, // 년 LANG("month") 필요
    hourLong: `M${LANG("month")} D${LANG("date")} ddd` // LANG("month") 일
  }
);

const krHeaderLabelFormats = Object.assign({}, defaultHeaderLabelFormats, {
  day: {
    Long: `A YYYY${LANG("year")} MM${LANG("month")} DD${LANG("date")}`
  }
});

const defaultTimeStart = moment()
  .startOf("day")
  .toDate();

// 시작시 끝까지 보일범위
const defaultTimeEnd = moment()
  .startOf("day")
  .add(7, "day")
  .toDate();

const keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "bookingId",
  itemDivTitleKey: "id",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title"
};

const sharedProps = {
  keys,
  minZoom: 14 * TimePerMs.DAY,
  maxZoom: 7 * TimePerMs.DAY,
  dragSnap: TimePerMs.DAY,
  subHeaderLabelFormats: krSubHeaderLabelFormats,
  headerLabelFormats: krHeaderLabelFormats,
  timeSteps: {
    hour: 24,
    day: 1,
    month: 1,
    year: 1
  },
  fixedHeader: "fixed",
  verticalLineClassNamesForTime: (timeStart: any, timeEnd: any) => {
    if (timeEnd < new Date().getTime())
      return ["verticalLine", "verticalLine--past"];
    return ["verticalLine"];
  },
  horizontalLineClassNamesForGroup: (group: any) => ["group"],
  defaultTimeStart,
  defaultTimeEnd
};

export {
  defaultHeaderLabelFormats,
  defaultSubHeaderLabelFormats,
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
  CustomHeader,
  sharedProps
};

interface IProps {
  dayPickerModalHook: IUseModal;
  getRootProps: any;
}

export const SharedSideBarHeader: React.FC<IProps> = ({
  dayPickerModalHook,
  getRootProps
}) => {
  return (
    <div>
      <div className="rct-header-root__topLeft" {...getRootProps()}>
        <div
          onMouseDown={e => {
            e.preventDefault();
            e.stopPropagation();
            // dayPickerModalHook.openModal();
          }}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            dayPickerModalHook.openModal();
          }}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <JDIcon
            className="dailyPrice__topLeftIcon"
            size={IconSize.MEDEIUM_SMALL}
            icon="calendar"
          />
        </div>
      </div>
    </div>
  );
};

export default ErrProtecter(JDtimeline);
