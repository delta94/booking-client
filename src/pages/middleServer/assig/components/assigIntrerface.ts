import {
  RoomGender,
  PricingType,
  Gender,
  BookingModalModes,
  BookingStatus
} from "../../../../types/enum";
import {
  IRoomType,
  IHouseConfig,
  IBlockOp,
  TBookingModalOpenWithMark
} from "../../../../types/interface";
import {MutationFn, FetchResult} from "react-apollo";
import {
  allocateGuestToRoom,
  allocateGuestToRoomVariables,
  deleteBlock,
  deleteBlockVariables,
  updateBooking,
  updateBookingVariables,
  deleteGuests,
  deleteGuestsVariables,
  createBlock,
  createBlockVariables,
  deleteBooking,
  deleteBookingVariables,
  updateBlockOption,
  updateBlockOptionVariables,
  getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_blockOption,
  startBooking,
  getAllRoomTypeWithGuest_GetGuests_guests,
  getBooking_GetBooking_booking_roomTypes,
  startBooking_StartBooking,
  getAllRoomTypeWithGuestVariables,
  getAllRoomTypeWithGuest,
  getBooking_GetBooking_booking_guests
} from "../../../../types/api";
import {IUseModal} from "../../../../hooks/hook";
import {string} from "prop-types";
import {MouseEvent} from "react";
import {IMoveCount, IDotPoint} from "../../../../atoms/timeline/Timeline";
import {ApolloQueryResult} from "apollo-boost";

export interface IAssigTimelineContext {
  isMobile: boolean;
  windowWidth: number;
  windowHeight: number;
  houseConfig: IHouseConfig;
  groupData: IAssigGroup[];
  houseId: string;
  shortKey?: TShortKey;
}

export type ICreateCreateItem = (
  canvasInfo: ICanvasMenuTooltipProps,
  gender?: Gender | undefined
) => void;

export type TIsTherePerson = (
  startTime: number,
  endTime: number,
  groupId: string,
  guest: IAssigItem
) => boolean;

export type TFilterTimeZone = (
  from: number,
  to: number,
  roomId?: string | undefined
) => IAssigItem[];

export type TGetItemById = (guestId: string) => IAssigItem;

export type TPopUpItemMenuTooltip = (
  location: {
    clientX: number;
    clientY: number;
  },
  target: IAssigItem
) => Promise<void>;

export type TGetGroupById = (groupId: string) => IAssigGroup;

export type TRemoveMark = () => void;

export type TDleteGhost = () => void;

export type TAllTooltipsHide = (
  except?: "blockMenu" | "canvasMenu" | "createMenu" | "itemTooltip"
) => void;

export type TDeleteGuestById = (guestId: string) => void;

export type TCreateMark = (
  start: number,
  end: number,
  groupIds: string[]
) => void;

export type TDeleteItemById = (id: string) => void;

export interface ILocation {
  clientX: number;
  clientY: number;
}

export type TOpenCreateMenu = (
  Eorlocation: React.MouseEvent<HTMLElement> | ILocation,
  props?: ICreateMenuProps
) => void;

export type TOpenBlockMenu = (
  Eorlocation: React.MouseEvent<HTMLElement> | ILocation,
  props?: IBlcokMenuProps
) => void;

export type TChangeMarkToGhost = () => void;

export type THandleDraggingCell = (
  e: any,
  moveCounts: IMoveCount,
  dotPoint: IDotPoint
) => void;

export type TOpenCanvasMenuTooltip = (
  Eorlocation: React.MouseEvent<HTMLElement> | ILocation
) => void;

export type TIsGenderSafe = (
  targetGroup: IAssigGroup,
  item: IAssigItem,
  start: number,
  end: number
) => boolean;

export type TResizeBlockBlock = (targetGuest: IAssigItem, time: number) => void;

export type TAllocateGuest = (
  itemId: string,
  newGroupOrder: number,
  originalCopy?: IAssigItem[]
) => void;

export type TAllocateItem = (
  targetGuest: IAssigItem,
  newGroupOrder: number
) => void;

export type TShortKey = (
  flag: "canvas" | "guestItem",
  e: React.MouseEvent<HTMLElement>,
  time?: number | undefined,
  groupId?: string | undefined,
  itemId?: string | undefined
) => Promise<void>;

export type TAddBlock = (
  start: number,
  end: number,
  groupIds: string[]
) => Promise<void>;

export type THandleMouseDown = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  gorup: EventTarget,
  start: number
) => void;

export type TGenderToggleById = (guestId: string) => void;

export type TResizeValidater = (item: IAssigItem, time: number) => void;

export type TResizeLinkedItems = (bookingId: string, newTime: number) => void;

export type TMoveLinkedItems = (bookingId: string, newTime: number) => void;

export type TDeleteBookingById = (bookingId: string) => void;

export type IGetGuestByBookingId = (bookingId: string) => IAssigItem[];

export type TGetBookingIdByGuestId = (guestId: string) => string;

export type IAssigMutationLoading = {
  updateBlockLoading: boolean;
  createBlockLoading: boolean;
  deleteBlockLoading: boolean;
  deleteGuestLoading: boolean;
  deleteBookingLoading: boolean;
  updateBookingLoading: boolean;
};

export type TToogleCheckIn = (
  guestId?: string | undefined,
  itemIndex?: number | undefined
) => void;

export interface IAssigGroup {
  id: string;
  title: string;
  roomTypeId: string;
  roomTypeIndex: number;
  roomIndex: number;
  roomType: IRoomType;
  room: {
    _id: string;
    name: string;
  };
  roomId: string;
  placeIndex: number;
  isLastOfRoom: boolean;
  isLastOfRoomType: boolean;
  bedIndex: number;
  type: "add" | "normal" | "addRoomType" | "noneGroup";
  roomGender: RoomGender | null;
  pricingType: PricingType;
}

export interface IAssigItemCrush {
  itemIndex: number;
  reason: string;
  start: number | null;
  end: number | null;
}

export interface IAssigItem {
  id: string;
  itemIndex: number;
  name: string;
  group: string;
  temp: boolean;
  loading: boolean;
  bookingId: string;
  checkInInfo: boolean;
  showNewBadge: boolean;
  roomTypeId: string;
  roomId: string;
  status: BookingStatus;
  bedIndex: number;
  start: number;
  showEffect: boolean;
  end: number;
  gender: Gender | null;
  canMove: boolean;
  blockOption: IBlockOp;
  type: GuestTypeAdd;
}

export interface IAssigDataControl {
  refetch: (
    variables?: getAllRoomTypeWithGuestVariables | undefined
  ) => Promise<ApolloQueryResult<getAllRoomTypeWithGuest>>;
  deleteBookingMu: MutationFn<deleteBooking, deleteBookingVariables>;
  allocateMu: MutationFn<allocateGuestToRoom, allocateGuestToRoomVariables>;
  deleteBlockMu: MutationFn<deleteBlock, deleteBlockVariables>;
  updateBookingMu: MutationFn<updateBooking, updateBookingVariables>;
  deleteGuestsMu: MutationFn<deleteGuests, deleteGuestsVariables>;
  createBlockMu: MutationFn<createBlock, createBlockVariables>;
  updateBlockOpMu: MutationFn<updateBlockOption, updateBlockOptionVariables>;
  stopPolling: () => void;
  startPolling: () => void;
  totalMuLoading: boolean;
  mutationLoadings: IAssigMutationLoading;
  networkStatus: number;
}

export interface ICanvasMenuTooltipProps {
  start: number;
  end: number;
  groupIds: string[];
}

export interface IBlcokMenuProps {
  item: IAssigItem;
}

export enum GuestTypeAdd {
  BLOCK = "BLOCK",
  GUEST = "GUEST",
  MARK = "MARK",
  GHOST = "GHOST"
}

export type TGetInfoesFromMarks = () => {
  start: number;
  end: number;
  groupIds: string[];
};

export interface ICreateMenuProps {
  item: IAssigItem;
}

export interface IDeletepgetDailyAssigUtilsMenuProps {
  item: IAssigItem;
}

export interface IDailyAssigUtils {
  allTooltipsHide: (except: string) => void;
  deleteGuestById: TDeleteGuestById;
  deleteBookingById: TDeleteBookingById;
  getBookingIdByGuestId: TGetBookingIdByGuestId;
  toogleCheckInOut: (
    targetGuest: getAllRoomTypeWithGuest_GetGuests_guests
  ) => Promise<void>;
}

export interface IDeleteMenuProps {
  item: IAssigItem;
}

export interface IDailyAssigDataControl {
  deleteBookingMu: MutationFn<deleteBooking, deleteBookingVariables>;
  deleteGuestsMu: MutationFn<deleteGuests, deleteGuestsVariables>;
  updateCheckInMu: MutationFn<updateBooking, updateBookingVariables>;
  createBlockMu: MutationFn<createBlock, createBlockVariables>;
  deleteBlockMu: MutationFn<deleteBlock, deleteBlockVariables>;
  updateBlockOpMu: MutationFn<updateBlockOption, updateBlockOptionVariables>;
  allocateMu: MutationFn<allocateGuestToRoom, allocateGuestToRoomVariables>;
  totalMuLoading: boolean;
}

export interface IAssigTimelineHooks {
  blockOpModal: IUseModal<IAssigItem>;
  bookingModal: IUseModal<any>;
  guestValue: IAssigItem[];
  createMenuProps: ICreateMenuProps;
  blockMenuProps: IDeleteMenuProps;
  setBlockMenuProps: React.Dispatch<React.SetStateAction<IDeleteMenuProps>>;
  setGuestValue: (value: IAssigItem[]) => void;
  setCreateMenuProps: React.Dispatch<React.SetStateAction<ICreateMenuProps>>;
  confirmDelteGuestHook: IUseModal<any>;
  dataTime: {
    start: number;
    end: number;
  };
  setDataTime: React.Dispatch<
    React.SetStateAction<{
      start: number;
      end: number;
    }>
  >;
}

export type THandleCanvasContextMenu = (
  groupId: string,
  time: number,
  e: React.MouseEvent<HTMLElement>
) => void;

export type THandleDraggingEnd = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>
) => void;

export type THandleTimeChange = (
  visibleTimeStart: number,
  visibleTimeEnd: number,
  updateScrollCanvas: any
) => void;

export type THandleItemClick = (
  itemId: string,
  e: React.MouseEvent<HTMLElement>,
  time: number
) => Promise<void>;

export type THandleItemMove = (
  itemId: string,
  dragTime: number,
  newGroupOrder: number
) => Promise<void>;

export type TGetGuestsInGroup = (group: IAssigGroup) => IAssigItem[];

export type TGetAssigInfoFromItems = (items: IAssigItem[]) => IAssigInfo[];

export type THandleCanvasClick = (
  groupId: string,
  time: number,
  e: React.MouseEvent<HTMLElement>
) => Promise<void>;

export type THandleItemDoubleClick = (
  itemId: string,
  e: React.MouseEvent<HTMLElement>,
  time: number
) => Promise<void>;

export type THandleCanvasDoubleClick = (
  groupId: string,
  time: number,
  e: React.MouseEvent<HTMLElement>
) => Promise<void>;

export type THandleMoveResizeValidator = (
  action: "move" | "resize",
  item: any,
  time: number,
  resizeEdge: "left" | "right" | undefined
) => number;

export type THandleItemResize = (
  itemId: string,
  time: number,
  edge: "left" | "right"
) => Promise<void>;

interface Ids {
  itemId?: string;
  bookingId?: string;
}

export type TGetItmes = (type: GuestTypeAdd) => IAssigItem[];

interface THlightGuestBlockProps {
  bookingId?: string;
  itemId?: string;
  scrollMove?: boolean;
}

export type THilightGuestBlock = ({
  scrollMove,
  itemId,
  bookingId
}: THlightGuestBlockProps) => void;

export type TBookingCheckedNew = (bookingId: string) => void;

export type THandleItemSelect = (
  itemId: string,
  e: React.MouseEvent<HTMLElement>,
  time: number
) => Promise<void>;

export interface IAssigHandlers {
  handleItemResize: THandleItemResize;
  handleItemMove: THandleItemMove;
  handleMouseDownCanvas: THandleMouseDown;
  handleItemClick: THandleItemClick;
  handleItemDoubleClick: THandleItemDoubleClick;
  handleCanvasClick: THandleCanvasClick;
  handleCanvasDoubleClick: THandleCanvasDoubleClick;
  handleMoveResizeValidator: THandleMoveResizeValidator;
  handleTimeChange: THandleTimeChange;
  handleCanvasContextMenu: THandleCanvasContextMenu;
  handleItemSelect: THandleItemSelect;
  handleDraggingCell: THandleDraggingCell;
  handleDraggingEnd: THandleDraggingEnd;
}

export interface IAssigTimelineUtils {
  changeMarkToGhost: TChangeMarkToGhost;
  getInfoesFromMarks: TGetInfoesFromMarks;
  getAssigInfoFromItems: TGetAssigInfoFromItems;
  bookingCheckedNew: TBookingCheckedNew;
  hilightGuestBlock: THilightGuestBlock;
  popUpItemMenuTooltip: TPopUpItemMenuTooltip;
  startBookingModalWithMark: TBookingModalOpenWithMark;
  getItemById: TGetItemById;
  getGroupById: TGetGroupById;
  getItems: TGetItmes;
  removeMark: TRemoveMark;
  deleteGhost: TDleteGhost;
  isTherePerson: TIsTherePerson;
  filterTimeZone: TFilterTimeZone;
  allTooltipsHide: TAllTooltipsHide;
  deleteGuestById: TDeleteGuestById;
  getGuestsInGroup: TGetGuestsInGroup;
  deleteItemById: TDeleteItemById;
  isGenderSafe: TIsGenderSafe;
  addBlock: TAddBlock;
  allocateGuest: TAllocateGuest;
  allocateItem: TAllocateItem;
  deleteBookingById: TDeleteBookingById;
  genderToggleById: TGenderToggleById;
  resizeValidater: TResizeValidater;
  resizeLinkedItems: TResizeLinkedItems;
  moveLinkedItems: TMoveLinkedItems;
  toogleCheckInOut: TToogleCheckIn;

  openBlockMenu: TOpenBlockMenu;
  openCanvasMenuTooltip: TOpenCanvasMenuTooltip;
  createMark: TCreateMark;
  resizeBlockBlock: TResizeBlockBlock;
  getBookingIdByGuestId: TGetBookingIdByGuestId;
  getGuestsByBookingId: IGetGuestByBookingId;
  createCreateItem: ICreateCreateItem;
  itemsToGuets: (
    items: IAssigItem[],
    groupDatas: IAssigGroup[]
  ) => getBooking_GetBooking_booking_guests[];
  groupToRoomType: (
    createItemTempGroups: IAssigGroup[]
  ) => getBooking_GetBooking_booking_roomTypes[];
}

export type IStartBookingCallBack = (
  result: "error" | startBooking_StartBooking
) => any;

export interface IAssigInfo {
  bedIndex: number;
  roomId: string;
  gender: Gender | null;
}
// ⭐️ 배정달력에서 예약 생성시사용
export interface ICreateBookingInfo {
  bookingId: string;
  createMode: boolean;
  type: BookingModalModes.CREATE;
  checkIn: number;
  checkOut: number;
  resvInfoes: {
    group: IAssigGroup;
    roomTypeName: string;
    roomTypeId: string;
    gender: Gender | null;
  }[];
  assigInfo: IAssigInfo[];
}