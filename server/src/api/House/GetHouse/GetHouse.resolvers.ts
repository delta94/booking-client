import { ObjectId } from "bson";
import { HouseModel } from "../../../models/House";
import { extractHouse } from "../../../models/merge/Merge";
import { GetHouseQueryArgs, GetHouseResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetHouse: privateResolver(async (_, {houseId, userId}: GetHouseQueryArgs, ctx): Promise<GetHouseResponse> => {
            try {
                const house = await HouseModel.findOne({
                    _id: new ObjectId(houseId),
                    user: new ObjectId(userId)
                });
                if(house){
                    return {
                        ok: true,
                        error: null,
                        house: await extractHouse(house)
                    }
                }else{
                    return {
                        ok: false,
                        error: "숙소 정보가 존재하지 않습니다.(H001)",
                        house: null
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    house: null
                }
            }
        })
    }
};

export default resolvers;
