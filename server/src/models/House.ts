import { Types } from "mongoose";
import { arrayProp, prop, Ref, Typegoose } from "typegoose";
import { HouseType, Location, TermsOfBooking } from "../types/graph";
import { houseAccessKeyGen } from "../utils/uuidgen";
import { ProductSchema } from "./Product";

export enum Type {
    GUEST_HOUSE = "GUEST_HOUSE",
    HOSTEL = "HOSTEL",
    HOTEL = "HOTEL",
    MOTEL = "MOTEL",
    PENSION = "PENSION",
    YOUTH_HOSTEL = "YOUTH_HOSTEL"
}
export class HouseSchema extends Typegoose {
    @prop()
    hostApplication?: Types.ObjectId;

    @prop({ default: houseAccessKeyGen() })
    accessKey: string;

    @prop({ default: false })
    hostAppCreated: boolean;

    @prop({ ref: ProductSchema, required: true })
    product?: Ref<ProductSchema>;

    @prop({ required: true })
    name: string;

    @prop({
        required: true,
        enum: Type,
        default: Type.GUEST_HOUSE
    })
    houseType: HouseType;

    @prop({ required: true })
    location: Location;

    @prop()
    termsOfBooking: TermsOfBooking | undefined;

    @arrayProp({ items: Types.ObjectId, default: [] })
    refundPolicy: Types.ObjectId[];

    @prop({ required: true })
    user: Types.ObjectId;

    @arrayProp({ items: Types.ObjectId, default: [] })
    roomTypes: Types.ObjectId[];

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    @prop()
    moduleSrl?: number;
}

export const HouseModel = new HouseSchema().getModelForClass(HouseSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "Houses"
    }
});
