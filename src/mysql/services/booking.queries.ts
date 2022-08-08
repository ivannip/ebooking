export const bookingQueries = {
    findAll: `select * from bookings`,
    findByCanditate: `select b.id as id, firstName, lastName, idDocNo, mobile, email, selectedPlace, selectedDate, selectedTime, sampleId from canditates a, bookings b where a.id = b.canditateId and b.canditateId = ?`,
    createOne: `insert into bookings (canditateId, selectedPlace, selectedDate, selectedTime) values (?,?,?,?)`,
    findByMobile: `select b.id as id, firstName, lastName, idDocNo, mobile, email, selectedPlace, selectedDate, selectedTime, sampleId from canditates a, bookings b where a.id = b.canditateId and a.mobile = ?`,
    updateSampleById: `Update bookings set sampleId = ? where id = ?`,
};


