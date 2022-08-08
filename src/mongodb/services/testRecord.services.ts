import { ITestRecord, TestRecord } from "../../mongodb/models/testRecord.model";


export const createOneService= async(testRecord: ITestRecord) => {
    
    const createdRecord: ITestRecord = await TestRecord.create({sampleId: testRecord.sampleId, firstName: testRecord.firstName, mobile: testRecord.mobile, isDocNo: testRecord.idDocNo});
    return createdRecord;
};

export const findBySampleIdService = async(sampleId: ITestRecord["sampleId"]) => {

    const foundRecords: ITestRecord [] = await TestRecord.find({sampleId: sampleId});
    return foundRecords;
}

export const updateResultByIdService = async(testRecord: ITestRecord) => {
    
    const updatedRecord: ITestRecord = await TestRecord.findOneAndUpdate({_id: testRecord._id}, {result: testRecord.result}, {new:true});
    return updatedRecord;
}