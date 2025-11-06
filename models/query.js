const pool = require("./pool");


exports.emailGet = async (email) => {
    const { rows } = await pool.query(`SELECT email FROM user_details WHERE email = $1`, [email]);
    return rows;
}

exports.userByIdGet = async (userId) => {
    const { rows } = await pool.query(`SELECT * FROM user_details WHERE id = $1`, [userId]);
    return rows;
}

exports.userGet = async ( username ) => {
    const { rows } = await pool.query(`SELECT * FROM user_details WHERE username = ($1)`, [username]);
    return rows;
}

exports.messagesGet = async () => {
    const SQL = `
        SELECT username, title, message, date, status FROM user_details AS ud
        INNER JOIN user_messages AS um ON ud.id = um.user_id
        LEFT JOIN membership AS m ON um.user_id = m.user_id;
    `;

    const { rows } = await pool.query(SQL);
    return rows;
}

exports.userSignupPost = async ( username, email, password ) => {
    const SQL = `
        INSERT INTO user_details (username, email, password)
        VALUES ($1, $2, $3);
    `;
    await pool.query(SQL, [username, email, password]);
};

exports.userMessagePost = async (user_id, title, message) => {

    const SQL2 = `
        INSERT INTO user_messages (user_id, message, title, date)
        VALUES ($1, $2, $3, $4);
    `;

    const currentDate = new Date();
    const dateFormatted = `
        ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}
    `;

    await pool.query(SQL2, [user_id, message, title, dateFormatted]);
}
