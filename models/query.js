const pool = require("./pool");


exports.emailGet = async (email) => {
    const { rows } = await pool.query(`SELECT email FROM user_details WHERE email = $1`, [email]);
    return rows;
}

exports.userSignupPost = async ( username, email, password ) => {
    const SQL = `
        INSERT INTO user_details (username, email, password)
        VALUES ($1, $2, $3);
    `;
    await pool.query(SQL, [username, email, password]);
};

exports.userGet = async ( username, password ) => {
    const { rows } = pool.query(`SELECT * FROM users_details WHERE username = $1 AND password = $2`, [username, password]);
    return rows;
}
