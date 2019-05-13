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
        "HashedPassword": bcrypt.hashSync("ljksdajflkj",salt).toString(), //Note: save hashed Password here
        "FavoriteMusicGenres": ["Pop","Rap"],
        "FavoriteMovieGenres": ["Thriller","Romance"],
        "Favorites": ["Pulp Fiction", "The Breakfast Club"],
        "MusicLists": ["7b7997a2-c0d22-4f2c-b24a","7b6916a2-dd0f2-4g8g-h23d"],
        "MovieLists": ["7b7997a2-c0d12-4f8c-b17a","7b6936a2-dw0f2-4g8g-h16d"],
        "WatchLater": "7b7997a2-c0d2-4f8c-b27a1"
    }
    const user = await users.addUser(userinfo);
    console.log(user);
    let listinfo ={
        "Name": "to be calm",
        "Type": "music",
        "Owner": "Sunii Kim",
        "Status": "private",

        "Media": [{
            "Name": "Nonstop",
            "Artist": "Drake",
            "Type": "Music",
            "Link": "https://open.spotify.com/album/1ATL5GLyefJaxhQzSPVrLX?si=4PqBwHBHRo2d0UpJe2wgJQ",
            "Genres": ["Rap", "Hip-Hop", "Pop"]
            }],

        "Comments":[{
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