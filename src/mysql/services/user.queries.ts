export const userQueries = {
    findAll: `select * from users`,
    findById: `select *, "*" as password from users where Id = ?`,
    findByLoginId: `select * from users where loginId = ?`,
    createOne: `insert into users (loginId, password, email, role) values (?,?,?,?)`
};