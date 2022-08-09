import { ITestRecord } from "../../mysql/models/testRecord.model";
import { execute } from "../../util/mysql.connect";

export const testRecordQueries = {
    findBySampleId: "select * from testrecords where sampleId=?",
    createOne: "Insert into testrecords (sampleId, firstName, mobile, idDocNo) values (?,?,?,?)",
    updateResultById: "Update testrecords set result = ? where id = ?"
} 

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
