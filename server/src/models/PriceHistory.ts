import * as _ from "lodash";
import { Types } from "mongoose";
import {
    instanceMethod,
    InstanceType,
    prop,
    staticMethod,
    Typegoose
} from "typegoose";
import { BookerSchema } from "./Booker";
import { GuestSchema } from "./Guest";

export class PriceHistorySchema extends Typegoose {
    @staticMethod
    static createPriceHistory(
        date: Date,
        guestInstance: InstanceType<GuestSchema>,
        bookerInstance: InstanceType<BookerSchema>,
        price: number,
        suggestedPrice: number
    ): InstanceType<PriceHistorySchema> {
        if (
            !bookerInstance.guests.includes(
                new Types.ObjectId(guestInstance._id)
            )
        ) {
            // TODO
        }
        return new PriceHistoryModel({
            start: bookerInstance.start,
            end: bookerInstance.end,
            date,
            guest: new Types.ObjectId(guestInstance._id),
            booker: new Types.ObjectId(bookerInstance._id),
            price,
            suggestedPrice
        });
    }

    @staticMethod
    static createPriceHistories(params: {
        start: Date;
        end: Date;
        bookerInstance: InstanceType<BookerSchema>;
        guestInstance: InstanceType<GuestSchema>;
        price: number;
        suggestedPrice: number;
    }): Array<InstanceType<PriceHistorySchema>> {
        // TODO
        return [];
    }

    @prop()
    date: Date;

    @prop()
    guest: Types.ObjectId;

    @prop()
    booker: Types.ObjectId;

    @prop()
    price: number;

    @prop()
    suggestedPrice: number;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    @instanceMethod
    async deleteThis(this: InstanceType<PriceHistorySchema>) {
        await this.remove();
    }
}

export const PriceHistoryModel = new PriceHistorySchema().getModelForClass(
    PriceHistorySchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "PriceHistories"
        }
    }
);