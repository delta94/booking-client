//= =============================================================
// START Enums from BackEnd
//= =============================================================

export enum UserRole {
  ADMIN = 'ADMIN',
  GHOST = 'GHOST',
  GUEST = 'GUEST',
  HOST = 'HOST',
}

export enum HouseType {
  GUEST_HOUSE = 'GUEST_HOUSE',
  HOSTEL = 'HOSTEL',
  HOTEL = 'HOTEL',
  MOTEL = 'MOTEL',
  PENSION = 'PENSION',
  YOUTH_HOSTEL = 'YOUTH_HOSTEL',
}

export enum AutoSms {
  READY_TO_PAY = 'READY_TO_PAY',
  COMPELETE = 'COMPELETE',
  CANCEL = 'CANCEL',
  NO_SEND = 'NO_SEND',
}

export enum SmsTarget {
  HOST = 'HOST',
  GUEST = 'GUEST',
  BOTH = 'BOTH',
}

export enum PricingType {
  DOMITORY = 'DOMITORY',
  ROOM = 'ROOM',
}

export enum RoomGender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  MIXED = 'MIXED',
  SEPARATELY = 'SEPARATELY',
}

export interface LocationInput {
  address: string;
  addressDetail?: string | null;
  lat: number;
  lng: number;
}

export interface TagInput {
  name: string;
  content: string;
  icon?: string | null;
}

export interface TermsOfBookingInput {
  farthestSelectableDate: number;
  nearestSelectableDate: number;
  selectableDateRange: number;
}

export interface TermsOfRefundInput {
  beforeDays: number;
  rate: number;
  description?: string | null;
}

//= =============================================================
// START Enums from Front End
//= =============================================================

export enum PricingTypeKr {
  DOMITORY = '도미토리',
  ROOM = '방 타입',
}

export enum RoomGenderKr {
  FEMALE = '여성',
  MALE = '남성',
  MIXED = '성별제한없음',
  SEPARATELY = '혼숙금지',
}

export enum TimePerMs {
  DAY = 24 * 60 * 60 * 1000,
}

export enum PaymentStatus {
  NOT_YET = 'NOT_YET',
  COMPLETE = 'COMPLETE',
}

export enum BookingStatus {
  COMPLETE = 'COMPLETE',
  CANCEL = 'CANCEL',
}

export enum PayMethod {
  ACCOUNT_SEND = 'ACCOUNT_SEND',
  CARD = 'CARD',
  CASH = 'CASH',
  KAKAOPAY = 'KAKAOPAY',
  CHANNEL = 'CHANNEL',
  ELSE = 'ELSE',
}
export enum Product {
  TEST = '상품1',
}

// css variable 의 breackPoints 와 일치하도록 하세요.
export enum WindowSize {
  MOBILE = 400,
  PHABLET = 550,
  TABLET = 750,
  DESKTOP = 1000,
  DESKTOPHD = 1200,
}

export enum Gender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
}

//= =============================================================
// START global options
//= =============================================================

export const SELECT_DUMMY_OP = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const SELECT_COUNT_DUMMY_OP = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
];

export const AUTO_SEND_OP = [
  { value: AutoSms.NO_SEND, label: '발신안함' },
  { value: AutoSms.COMPELETE, label: '예약완료시' },
  { value: AutoSms.READY_TO_PAY, label: '예약대기시' },
  { value: AutoSms.CANCEL, label: '예약취소시' },
];

export const BOOKING_STATUS_OP = [
  { value: BookingStatus.COMPLETE, label: '예약완료' },
  { value: BookingStatus.CANCEL, label: '예약취소' },
];

export const PAYMENT_STATUS_OP = [
  { value: PaymentStatus.COMPLETE, label: '결제완료' },
  { value: PaymentStatus.NOT_YET, label: '미결제' },
];

export const SMS_TARGET_OP = [
  { value: SmsTarget.BOTH, label: '관리자,게스트' },
  { value: SmsTarget.GUEST, label: '게스트' },
  { value: SmsTarget.HOST, label: '관리자' },
];

export const PAYMETHOD_OP = [
  { value: PayMethod.ACCOUNT_SEND, label: '무통장입금' },
  { value: PayMethod.CARD, label: '카드결제' },
  { value: PayMethod.CASH, label: '현금결제' },
  { value: PayMethod.KAKAOPAY, label: '카카오페이' },
  { value: PayMethod.CHANNEL, label: '채널결제' },
  { value: PayMethod.ELSE, label: '기타' },
];

export const ROOM_GENDER_OP = [
  { value: RoomGender.MIXED, label: RoomGenderKr.MIXED },
  { value: RoomGender.SEPARATELY, label: RoomGenderKr.SEPARATELY },
  { value: RoomGender.MALE, label: RoomGenderKr.MALE },
  { value: RoomGender.FEMALE, label: RoomGenderKr.FEMALE },
];

export const PRICING_TYPE_OP = [
  { value: PricingType.DOMITORY, label: PricingTypeKr.DOMITORY },
  { value: PricingType.ROOM, label: PricingTypeKr.ROOM },
];

export const MAX_PEOPLE_COUNT_OP_FN = () => {
  const maxPeopleCountOption = [];
  for (let i = 0; i < 100; i += 1) {
    maxPeopleCountOption.push({ value: i, label: `${i}명` });
  }
  return maxPeopleCountOption;
};

// --필요한것
// 예약상태
// 결제상태

/** 중립 */
export const NEUTRAL = '';

export const EMPTY = '';