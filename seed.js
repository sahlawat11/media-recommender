const dbConnection = require("./databaseConfig/mongoConnection");
const data = require("./data/");
const users = data.users;
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

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
        "Password": bcrypt.hashSync("ljksdajflkj",salt), //Note: save hashed Password here
        "favoriteMusicGenres": ["Pop","Rap"],
        "favoriteMovieGenres": ["Thriller","Romance"],
        "Favorites": ["Pulp Fiction", "The Breakfast Club"],
        "musicLists": ["7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310","7b696a2-d0f2-4g8g-h67d-7a1d4b6b6710"],
        "movieLists": ["7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310","7b696a2-d0f2-4g8g-h67d-7a1d4b6b6710"],
        "watchLater": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310"
    }
    const user = await users.addUser(userinfo);
    console.log(user);
    console.log("Done seeding database");
    await db.serverConfig.close();
  };
  
  main().catch(console.log);
  
  module.exports=main;