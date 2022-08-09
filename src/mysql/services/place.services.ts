import {execute} from "../../util/mysql.connect";
import {IPlace} from "../../mysql/models/place.model";
//import {logger} from "../util/logger";

export const findAllService = async () => {
    return  execute <IPlace []> ("select * from places", []);
}