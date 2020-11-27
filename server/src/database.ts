import {Pool} from 'pg'

const pool =new Pool({
    host: "localhost",
    user: "AMD",
    port: 5432,
    database: "postgres",
    password: "4862"
});

export default pool;