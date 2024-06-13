import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'ladmin',
    host: 'localhost',
    database: 'chess_league',
    password: 'ladmin',
    port: 5432,
});

export const getAccounts = async () => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM accounts', (error, results) => {
                if(error) {
                    reject(error);
                }
                if(results && results.rows) {
                    resolve(results.rows);
                } else {
                    reject(new Error('No results found'));
                }
            });
    });
    } catch (error_1) {
        console.log(error_1);
        throw new Error('Internal server error');
    }
};

export const createAccount = async (body) => {
    return new Promise(function (resolve, reject) {
        const { username, password, passwd_salt, is_admin } = body;
        pool.query('INSERT INTO accounts (username, password, passwd_salt, is_admin) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, password, passwd_salt, is_admin],
            (error, results) => {
                if(error) {
                    reject(error);
                }
                if(results && results.rows) {
                    resolve(
                        `A new account has been added: ${JSON.stringify(results.rows[0])}`
                    );
                } else {
                    reject(new Error('No results found'));
                }
            }
        );
    });
};

export const deleteAccount = async (id) => {
    return new Promise(function (resolve, reject) {
        pool.query('DELETE FROM accounts WHERE id = $1', 
            [id], 
            (error, results) => {
            if(error) {
                reject(error);
            }
            resolve(`Account deleted with ID: ${id}`);
        });
    });
};

export const updateAccount = async (id, body) => {
    return new Promise(function (resolve, reject) {
        const { username, password, passwd_salt } = body;
        pool.query('UPDATE accounts SET username = $1, password = $2, passwd_salt = $3 WHERE id = $4 RETURNING *',
            [username, password, passwd_salt, id],
            (error, results) => {
                if(error) {
                    reject(error);
                }
                if(results && results.rows) {
                    resolve(`Account updated: ${JSON.stringify(results.rows[0])}`);
                } else {
                    reject(new Error('No results found'));
                }
            }
        );
    });
};
