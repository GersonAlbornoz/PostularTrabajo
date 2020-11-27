"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: "localhost",
    user: "AMD",
    port: 5432,
    database: "postgres",
    password: "4862"
});
exports.default = pool;
