import {IPlace, Place} from "../../models/mongodb/place.model";

export const findAllService = async () => {
    const foundPlaces: IPlace [] = await Place.find({});
    return foundPlaces;
}