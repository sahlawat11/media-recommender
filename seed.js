const dbConnection = require("./databaseConfig/mongoConnection");
const data = require("./data/");
const users = data.users;
const playlists = data.playlists;
const movies = data.movies;
const movieInfo = require("./movieInfo")
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();
    
    let userinfo ={
        "FirstName": "John",
        "LastName": "Doe",
        "Email": "JDoe@gmail.com",
        "Gender": "M",
        "Location": "Hoboken",
        "AboutMe": "description",
        "Age": "25",
        "_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
        "HashedPassword": bcrypt.hashSync("ljksdajflkj",salt).toString(), //Note: save hashed Password here
        "FavoriteMusicGenres": ["Pop","Rap"],
        "FavoriteMovieGenres": ["Thriller","Romance"],
        "Favorites": ["Pulp Fiction", "The Breakfast Club"],
        "MusicLists": ["7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310","7b696a2-d0f2-4g8g-h67d-7a1d4b6b6710"],
        "MovieLists": ["7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310","7b696a2-d0f2-4g8g-h67d-7a1d4b6b6710"],
        "WatchLater": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310"
    }
    const user = await users.addUser(userinfo);
    console.log(user);
    let listinfo ={
        "_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
        "Name": "to be calm",
        "Type": "music",
        "Owner": "Sunii Kim",
        "Status": "private",

        "Media": [{
            "_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
            "Name": "Nonstop",
            "Artist": "Drake",
            "Type": "Music",
            "Link": "https://open.spotify.com/album/1ATL5GLyefJaxhQzSPVrLX?si=4PqBwHBHRo2d0UpJe2wgJQ",
            "Genres": ["Rap", "Hip-Hop", "Pop"]
            }],

        "Comments":[{
            "_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
            "User_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b8124",
            "User_name": "Tianxin Liu",
            "Comment": "Good music!"
        }]
    }
    const playlist = await playlists.addPlayList(listinfo);
    console.log(playlist);

    await movies.addMovies(movieInfo)
    
    //const MovieLists;
    console.log("Done seeding database");

    await db.serverConfig.close();
  };
  
  main().catch(console.log);
  
  module.exports=main;