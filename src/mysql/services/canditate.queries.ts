export const canditateQueries = {
    findAll: `select id, canditateNo, firstName, lastName, idDocNo, mobile, email, address from canditates`,
    findById: `select id, canditateNo, firstName, lastName, idDocNo, mobile, email, address from canditates where id = ?`,
    findByMobile: `select id, canditateNo, firstName, lastName, idDocNo, mobile, email, address from canditates where mobile = ?`,
    createOne: `insert into canditates (canditateNo, firstName, lastName, idDocNo, mobile, email, address) values (?,?,?,?,?,?,?)`
}