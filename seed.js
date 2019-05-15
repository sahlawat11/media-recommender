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
    
    let listinfo ={
        "Name": "to be calm",
        "Type": "music",
        "Owner": "Sunii Kim",
        "Status": "public",

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
    
    let userinfo ={
        "FirstName": "John",
        "LastName": "Doe",
        "Email": "JDoe@gmail.com",
        "Gender": "M",
        "Location": "Hoboken",
        "AboutMe": "description",
        "Age": "25",
        "HashedPassword": bcrypt.hashSync("123456",salt).toString(), //Note: save hashed Password here
        "FavoriteMusicGenres": ["Pop","Rap"],
        "FavoriteMovieGenres": ["Thriller","Romance"],
        "Favorites": [playlist._id],
        "MusicLists": [playlist._id],
        "MovieLists": [playlist._id],
        "WatchLater": playlist._id
    }
    const user = await users.addUser(userinfo);
    console.log(user);
    console.log(await playlists.getPlaylistByObjectId(playlist._id))
    console.log(await playlists.getPlaylistByObjectId(user.MusicLists[0]))
    console.log(await playlists.getPlaylistByObjectId(user.MovieLists[0]))
    console.log(await playlists.getPlaylistByObjectId(user.WatchLater))
    //const MovieLists;
    console.log("Done seeding database");
  
    await db.serverConfig.close();
  };
  
  main().catch(console.log);
  
  module.exports=main;