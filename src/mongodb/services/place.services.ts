import {IPlace, Place} from "../models/place.model";

export const findAllService = async () => {
    const foundPlaces: IPlace [] = await Place.find({});
    return foundPlaces;
}