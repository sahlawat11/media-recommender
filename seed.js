const dbConnection = require("./databaseConfig/mongoConnection");
const data = require("./data/");
const users = data.users;

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();
    let userinfo ={
        "firstName": "John",
        "lastName": "Doe",
        "Email": "JDoe@gmail.com",
        "Gender": "M",
        "Location": "Hoboken",
        "aboutMe": "description",
        "Age": "25",
        "_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
        "Password": "ljksdajflkj", //Note: save hashed Password here
        "favoriteMusicGenres": ["Pop","Rap"],
        "favoriteMovieGenres": ["Thriller","Romance"],
        "Favorites": ["Pulp Fiction", "The Breakfast Club"]
    }
    const user = await users.addUser(userinfo);
    console.log("Done seeding database");
    await db.serverConfig.close();
  };
  
  main().catch(console.log);
  
  module.exports=main;