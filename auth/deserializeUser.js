const db = require("../db/queries"); 

async function deserializeUser(id, done) {
  try {
    const user = await db.getUserById(id); 
    done(null, user); 
  } catch(err) {
    done(err); 
  }
}

module.exports = deserializeUser; 