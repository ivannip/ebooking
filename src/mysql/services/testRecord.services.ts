import { ITestRecord } from "../../mysql/models/testRecord.model";
import { testRecordQueries } from "./testrecord.queries";
import { execute } from "../../util/mysql.connect";

export const createOneService = async(testRecord: ITestRecord) => {
    return await execute <{affectedRows: number, insertId: number}> (testRecordQueries.createOne, 
        [testRecord.sampleId, testRecord.firstName, testRecord.mobile, testRecord.idDocNo ]);
    
};

export const findBySampleIdService = async(sampleId: ITestRecord["sampleId"]) => {
    return await execute <ITestRecord []> (testRecordQueries.findBySampleId, [sampleId]);
}

export const updateResultByIdService = async(testRecord: ITestRecord) => {
    return await execute <{affectedRows: number}> (testRecordQueries.updateResultById, 
        [testRecord.result, testRecord.id]);
}
