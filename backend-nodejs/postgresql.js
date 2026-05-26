import postgresql from "pg";

const { Client } = postgresql;

export const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "sakalite2502",
    database: "postgres"
});

await client.connect();
console.log("Database terhubung");