import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'ladmin',
    host: 'localhost',
    database: 'chess_league',
    password: 'ladmin',
    port: 5432,
});

export const getPlayers = async () => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM players', (error, results) => {
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

export const createPlayer = async (body) => {
    return new Promise(function (resolve, reject) {
        const { name, surname, ranking, id_account } = body;
        pool.query('INSERT INTO players (name, surname, ranking, id_account) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, surname, ranking, id_account],
            (error, results) => {
                if(error) {
                    reject(error);
                }
                if(results && results.rows) {
                    resolve(
                        `A new player has been added: ${JSON.stringify(results.rows[0])}`
                    );
                } else {
                    reject(new Error('No results found'));
                }
            }
        );
    });
};

export const deletePlayer = async (id) => {
    return new Promise(function (resolve, reject) {
        pool.query('DELETE FROM players WHERE id = $1', 
            [id], 
            (error, results) => {
            if(error) {
                reject(error);
            }
            resolve(`player deleted with ID: ${id}`);
        });
    });
};

export const updatePlayer = async (id, body) => {
    return new Promise(function (resolve, reject) {
        const { name, surname, ranking, id_account } = body;
        pool.query('UPDATE players SET name = $1, surname = $2, ranking = $3, id_account = $4 WHERE id = $5 RETURNING *',
            [name, surname, ranking, id_account, id],
            (error, results) => {
                if(error) {
                    reject(error);
                }
                if(results && results.rows) {
                    resolve(`Player updated: ${JSON.stringify(results.rows[0])}`);
                } else {
                    reject(new Error('No results found'));
                }
            }
        );
    });
};