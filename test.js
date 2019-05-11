const dbConnection = require("./databaseConfig/mongoConnection");
const data = require("./data/");
const users = data.users;
const playlists = data.playlists;
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();
    
    await db.serverConfig.close();
  };
  
  main().catch(console.log);
  
  module.exports=main;