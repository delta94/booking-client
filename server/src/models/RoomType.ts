import { ObjectId } from "bson";
import {
    arrayProp,
    index,
    InstanceType,
    pre,
    prop,
    Typegoose
} from "typegoose";
import { PricingType, RoomGender } from "../types/graph";

export enum PricingTypeEnum {
    ROOM = "ROOM",
    DOMITORY = "DOMITORY"
}

export enum RoomGenderEnum {
    FEMALE = "FEMALE",
    MALE = "MALE",
    MIXED = "MIXED",
    SEPARATELY = "SEPARATELY"
}

@index({ house: 1 })
@index({ index: -1 })
@pre<RoomTypeSchema>("save", async function(next) {
    try {
        if (this.index <= 0 || !this.index) {
            const test = await RoomTypeModel.findOne({
                house: new ObjectId(this.house)
            }).sort({ index: -1 });
            if (test) {
                this.index = test.index + 1;
            }
        }
        if (this.peopleCount > this.peopleCountMax) {
            this.peopleCountMax = this.peopleCount;
        }
        this.house = new ObjectId(this.house);
    } catch (error) {
        throw error;
    }
    next();
})
export class RoomTypeSchema extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    house: ObjectId;

    @prop({
        required: true,
        default: PricingTypeEnum.ROOM,
        enum: PricingTypeEnum
    })
    pricingType: PricingType;

    @prop({
        required(this: InstanceType<RoomTypeSchema>) {
            return this.pricingType === "DOMITORY";
        },
        enum: RoomGenderEnum,
        default: RoomGenderEnum.MIXED
    })
    roomGender: RoomGender;

    @prop()
    img: string;

    @prop({
        required: [
            function(this: RoomTypeSchema) {
                return 0 < this.peopleCount;
            },
            "Too Few peopleCount..."
        ],
        default: 1
    })
    peopleCount: number;

    @prop({
        required: [
            function(this: RoomTypeSchema): boolean {
                return this.peopleCount <= this.peopleCountMax;
            },
            "PeopleCountMax is Always Higher than PeopleCount."
        ],
        default(this: RoomTypeSchema) {
            return this.peopleCount;
        }
    })
    peopleCountMax: number;

    @prop({
        min: 0,
        default: 0
    })
    index: number;

    @prop()
    description: string;

    @prop({ default: 0 })
    price: number;

    @prop()
    tags: string;

    @arrayProp({ items: ObjectId, default: [] })
    rooms: ObjectId[];

    @prop()
    get roomCount(): number {
        return -1;
    }

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    // Legarcy 연동을 위한 엔티티...
    @prop()
    roomTemplateSrl?: number;
}

export const RoomTypeModel = new RoomTypeSchema().getModelForClass(
    RoomTypeSchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "RoomTypes"
        }
    }
);
