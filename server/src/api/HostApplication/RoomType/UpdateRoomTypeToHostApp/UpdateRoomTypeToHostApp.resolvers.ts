import { Resolvers } from "../../../../types/resolvers";
import privateResolverForHostApp from "../../../../utils/privateResolverForHostApplication";
import {
    UpdateRoomTypeToHostAppMutationArgs,
    UpdateRoomTypeToHostAppResponse
} from "../../../../types/graph";
import { RoomTypeModel } from "../../../../models/RoomType";
import { ObjectId } from "bson";
import { InstanceType } from "typegoose";
import { HouseSchema } from "../../../../models/House";
import { extractRoomType } from "../../../../models/merge/merge";

const resolvers: Resolvers = {
    Mutation: {
        UpdateRoomTypeToHostApp: privateResolverForHostApp(
            async (
                _,
                {
                    roomTemplateSrl,
                    ...args
                }: UpdateRoomTypeToHostAppMutationArgs,
                { req }
            ): Promise<UpdateRoomTypeToHostAppResponse> => {
                try {
                    const house: InstanceType<HouseSchema> = req.house;
                    const existingRoomType = await RoomTypeModel.findOne({
                        house: new ObjectId(house._id),
                        roomTemplateSrl
                    });
                    if (!existingRoomType) {
                        return {
                            ok: false,
                            error: "RoomType is not exist",
                            roomType: null
                        };
                    }
                    await existingRoomType.update(
                        {
                            ...args
                        },
                        {
                            new: true
                        }
                    );
                    return {
                        ok: true,
                        error: null,
                        roomType: await extractRoomType.bind(
                            extractRoomType,
                            existingRoomType
                        )
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: "Underdevelop",
                        roomType: null
                    };
                }
                return {
                    ok: false,
                    error: null,
                    roomType: null
                };
            }
        )
    }
};
export default resolvers;