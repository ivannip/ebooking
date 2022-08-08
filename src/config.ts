const config = {
    "PORT": process.env.PORT,
    "DB_HOST": process.env.DB_HOST,
    "DB_USER": process.env.DB_USER,
    "DB_PASSWORD": process.env.DB_PASSWORD,
    "DB_PORT": process.env.DB_PORT,
    "DB_DATABASE": process.env.DB_DATABASE,
    "DB_CONNECTION_LIMIT": process.env.DB_CONNECTION_LIMIT,
    "SECRET": process.env.SECRET,
    "TOKEN_EXPIRE": process.env.TOKEN_EXPIRE
}

module.exports = config;