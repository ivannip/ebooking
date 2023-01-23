import {execute} from "../../util/mysql.connect";
import {IPlace} from "../../models/mysql/place.model";
//import {logger} from "../util/logger";

export const findAllService = async () => {
    console.log("call find all place service")
    return  execute <IPlace []> ("select * from places", []);
}