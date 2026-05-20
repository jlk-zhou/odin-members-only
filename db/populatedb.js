const { Client }= require("pg"); 
require("dotenv").config(); 

const SQL = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,  
    firstname VARCHAR(255), 
    lastname VARCHAR(255) DEFAULT NULL, 
    email VARCHAR(255), 
    password VARCHAR(255), 
    is_admin BOOLEAN DEFAULT FALSE, 
    is_member BOOLEAN DEFAULT FALSE
  );
  
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,  
    added TIMESTAMP WITH TIME ZONE DEFAULT NOW(), 
    content VARCHAR(255), 
    user_id INTEGER REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS privilege_credentials ( 
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    status VARCHAR(255), 
    status_password VARCHAR(255)
  ) 
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