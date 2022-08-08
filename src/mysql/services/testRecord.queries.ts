export const testRecordQueries = {
    findBySampleId: "select * from testrecords where sampleId=?",
    createOne: "Insert into testrecords (sampleId, firstName, mobile, idDocNo) values (?,?,?,?)",
    updateResultById: "Update testrecords set result = ? where id = ?"
} 