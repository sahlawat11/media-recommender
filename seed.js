const dbConnection = require("./databaseConfig/mongoConnection");
const data = require("./data/");
const users = data.users;
const playlists = data.playlists;
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
    let listinfo ={
        "_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
        "name": "to be calm",
        "type": "music",
        "Owner": "Sunii Kim",
        "status": "public",

        "Media": [{
            "_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
            "Name": "Nonstop",
            "Artist": "Drake",
            "Type": "Music",
            "Link": "https://open.spotify.com/album/1ATL5GLyefJaxhQzSPVrLX?si=4PqBwHBHRo2d0UpJe2wgJQ",
            "Genres": ["Rap", "Hip-Hop", "Pop"]
            }],

        "comments":[{
            "_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
            "User_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b8124",
            "User_name": "Tianxin Liu",
            "Comment": "Good music!"
        }]
    }
    const playlist = await playlists.addPlayList(listinfo);
    console.log(playlist);
    console.log("Done seeding database");
    await db.serverConfig.close();
  };
  
  main().catch(console.log);
  
  module.exports=main;