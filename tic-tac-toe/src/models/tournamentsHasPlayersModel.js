import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'ladmin',
    host: 'localhost',
    database: 'chess_league',
    password: 'ladmin',
    port: 5432,
});

export const getT_has_P = async () => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM tournament_has_players', (error, results) => {
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

export const createT_has_P = async (body) => {
    return new Promise(function (resolve, reject) {
        const { id_tournament , id_player } = body;
        pool.query('INSERT INTO tournament_has_players (id_tournament, id_player) VALUES ($1, $2) RETURNING *',
            [id_tournament, id_player],
            (error, results) => {
                if(error) {
                    reject(error);
                }
                if(results && results.rows) {
                    resolve(
                        `A new Player has been added: ${JSON.stringify(results.rows[0])}`
                    );
                } else {
                    reject(new Error('No results found'));
                }
            }
        );
    });
};

export const deleteT_has_P = async (id) => {
    return new Promise(function (resolve, reject) {
        pool.query('DELETE FROM tournament_has_players WHERE id = $1', 
            [id], 
            (error, results) => {
            if(error) {
                reject(error);
            }
            resolve(`Player deleted with ID: ${id}`);
        });
    });
};

export const updateT_has_P = async (id, body) => {
    return new Promise(function (resolve, reject) {
        const { id_tournament , id_player } = body;
        pool.query('UPDATE tournament_has_players SET id_tournament = $1, id_player = $2 WHERE id = $3 RETURNING *',
            [id_tournament , id_player, id],
            (error, results) => {
                if(error) {
                    reject(error);
                }
                if(results && results.rows) {
                    resolve(`Tournament updated: ${JSON.stringify(results.rows[0])}`);
                } else {
                    reject(new Error('No results found'));
                }
            }
        );
    });
};