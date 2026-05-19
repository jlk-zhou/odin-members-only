const { Client }= require("pg"); 
require("dotenv").config(); 

const SQL = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,  
    firstname VARCHAR(255), 
    lastname VARCHAR(255) DEFAULT NULL, 
    email VARCHAR(255), 
    password VARCHAR(255) 
  );
  
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,  
    added TIMESTAMP WITH TIME ZONE DEFAULT NOW(), 
    content VARCHAR(255), 
    user_id INTEGER REFERENCES users(id)
  );
`; 

async function main() {
  const client = new Client({
    connectionString: process.env.DB, 
  }); 

  await client.connect(); 
  await client.query(SQL);
  await client.end(); 
}

main(); 