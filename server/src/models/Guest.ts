import { Types } from "mongoose";
import { instanceMethod, InstanceType, prop, Typegoose } from "typegoose";
import {
    BookingStatusEnum,
    GuestTypeEnum,
    PricingTypeEnum
} from "../types/enums";
import {
    BookingStatus,
    DateRange,
    Gender,
    GuestType,
    IsSettleable,
    PricingType
} from "../types/graph";
import { bookingModel } from "./bookingss";

enum GenderEnum {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export class GuestSchema extends Typegoose {
    @prop({ required: true })
    house: Types.ObjectId;

    @prop({
        required(this: InstanceType<GuestSchema>) {
            return this.guestType === "GUEST";
        }
    })
    booking: Types.ObjectId;

    @prop({
        required(this: InstanceType<GuestSchema>) {
            return this.guestType === "GUEST";
        }
    })
    name: string;

    @prop({
        required(this: InstanceType<GuestSchema>) {
            return this.guestType === "GUEST";
        }
    })
    roomType: Types.ObjectId;

    @prop({
        enum: PricingTypeEnum,
        required(this: InstanceType<GuestSchema>) {
            return this.guestType === "GUEST";
        }
    })
    pricingType: PricingType;

    @prop({
        enum: GenderEnum,
        required(this: InstanceType<GuestSchema>) {
            return (
                this.guestType === "GUEST" && this.pricingType === "DOMITORY"
            );
        }
    })
    gender: Gender;

    @prop({ required: true })
    allocatedRoom: Types.ObjectId;

    @prop({ default: 0 })
    bedIndex: number; // PricingType === "ROOM" 인 경우 0으로 함...

    @prop({ default: true })
    isUnsettled: boolean;

    @prop()
    isSettleable: IsSettleable;

    @prop()
    start: Date;

    @prop()
    end: Date;

    @prop({
        enum: BookingStatusEnum,
        default: BookingStatusEnum.COMPLETE
    })
    bookingStatus: BookingStatus;

    @prop({ enum: GuestTypeEnum, default: GuestTypeEnum.GUEST })
    guestType: GuestType;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    @instanceMethod
    async verifySettleable(
        this: InstanceType<GuestSchema>
    ): Promise<IsSettleable> {
        // 배정 확정이면 무조건 verifySettleable.flag === true
        // 해당 배드에 인원이 들어갈 수 있는지 체크하면됨.
        // 1. 해당 배드에 "배정확정"된 인원이 있는지 확인한다.
        //  => 배정 확정인 인원이 있는 경우 확정인 인원의 날짜를 가져옴.
        // 배정 확정인 인원들 정보 가져오는 쿼리.
        const guestInstances = await GuestModel.find(
            {
                start: {
                    $lte: new Date(this.end)
                },
                end: {
                    $gte: new Date(this.start)
                },
                isUnsettled: false
            },
            {
                start: true,
                end: true,
                isUnsettled: true
            }
        );
        const { start, end } = {
            start: this.start.getTime(),
            end: this.end.getTime()
        };
        const dates = guestInstances.map(
            (guestInstance): DateRange => {
                return {
                    start:
                        start > guestInstance.start.getTime()
                            ? this.start
                            : guestInstance.start,
                    end:
                        guestInstance.end.getTime() > end
                            ? this.end
                            : guestInstance.end
                };
            }
        );
        return {
            flag: dates.length === 0,
            duplicateDates: dates
        };
    }

    @instanceMethod
    async unlinkWithbooking(this: InstanceType<GuestSchema>) {
        const bookingInstance = await bookingModel.updateOne(
            {
                _id: this.booking
            },
            {
                $pull: {
                    guests: new Types.ObjectId(this._id)
                }
            }
        );
        console.log(bookingInstance);
    }

    @instanceMethod
    async updageDateRange(
        this: InstanceType<GuestSchema>,
        dateRange: DateRange
    ) {
        const { start, end } = dateRange;
        console.log({
            start,
            end
        });
    }
}

export const GuestModel = new GuestSchema().getModelForClass(GuestSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "Guests"
    }
});
