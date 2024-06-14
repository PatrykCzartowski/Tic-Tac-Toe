import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'ladmin',
    host: 'localhost',
    database: 'chess_league',
    password: 'ladmin',
    port: 5432,
});

export const getTournaments = async () => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM tournaments', (error, results) => {
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

export const getTournamentById = async (id) => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM tournaments WHERE id = $1', [id], (error, results) => {
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

export const createTournament = async (body) => {
    return new Promise(function (resolve, reject) {
        const { name , is_active, prize } = body;
        pool.query('INSERT INTO tournaments (name, is_active, prize) VALUES ($1, $2, $3) RETURNING *',
            [name, is_active, prize],
            (error, results) => {
                if(error) {
                    reject(error);
                }
                if(results && results.rows) {
                    resolve(
                        `A new Tournament has been added: ${JSON.stringify(results.rows[0])}`
                    );
                } else {
                    reject(new Error('No results found'));
                }
            }
        );
    });
};

export const deleteTournament = async (id) => {
    return new Promise(function (resolve, reject) {
        pool.query('DELETE FROM tournaments WHERE id = $1', 
            [id], 
            (error, results) => {
            if(error) {
                reject(error);
            }
            resolve(`Tournament deleted with ID: ${id}`);
        });
    });
};

export const updateTournament = async (id, body) => {
    return new Promise(function (resolve, reject) {
        const { name, is_active, prize } = body;
        pool.query('UPDATE tournaments SET name = $1, is_active = $2, prize = $3 WHERE id = $4 RETURNING *',
            [name, is_active, prize, id],
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