import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'ladmin',
    host: 'localhost',
    database: 'chess_league',
    password: 'ladmin',
    port: 5432,
});

export const getGames = async () => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM games', (error, results) => {
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

export const getGamesById = async (id) => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM games WHERE id = $1', [id], (error, results) => {
                if(error) {
                    reject(error);
                }
                if(results && results.rows) {
                    resolve(results.rows);
                } else {
                    reject(new Error('No results found'));
                }
            }
        );
    });
    } catch (error_1) {
        console.log(error_1);
        throw new Error('Internal server error');
    }
};

export const createGame = async (body) => {
    return new Promise(function (resolve, reject) {
        const { id_player1, id_player2, id_torunament, result} = body;
        pool.query('INSERT INTO accounts (id_player1, id_player2, id_torunament, result) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, password, passwd_salt],
            (error, results) => {
                if(error) {
                    reject(error);
                }
                if(results && results.rows) {
                    resolve(
                        `A new Game has been added: ${JSON.stringify(results.rows[0])}`
                    );
                } else {
                    reject(new Error('No results found'));
                }
            }
        );
    });
};

export const deleteGame = async (id) => {
    return new Promise(function (resolve, reject) {
        pool.query('DELETE FROM games WHERE id = $1', 
            [id], 
            (error, results) => {
            if(error) {
                reject(error);
            }
            resolve(`Game deleted with ID: ${id}`);
        });
    });
};

export const updateGame = async (id, body) => {
    return new Promise(function (resolve, reject) {
        const { id_player1, id_player2,id_torunament, result } = body;
        pool.query('UPDATE games SET id_player1 = $1, id_player2 = $2, id_torunament = $3, result = $4 WHERE id = $5 RETURNING *',
            [id_player1, id_player2, id_torunament, result, id],
            (error, results) => {
                if(error) {
                    reject(error);
                }
                if(results && results.rows) {
                    resolve(`Game updated: ${JSON.stringify(results.rows[0])}`);
                } else {
                    reject(new Error('No results found'));
                }
            }
        );
    });
};
