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
    
    let listinfo1 ={
        "Name": "to be calm",
        "Type": "music",
        "Owner": "Sunii Kim",
        "Status": "public",
        "Media": [{
            "name": "It Never Rains in Southern California",
            "artist": "Albert Hammond",
            "artistUrl": "https://open.spotify.com/artist/34E3csCxpXunPGEkOVVX2g",
            "previewUrl":"https://open.spotify.com/album/0gdQF4mVBPjv5hhjtoe3hM"
        }],

        "Comments":[{
            "User_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b8124",
            "User_name": "Tianxin Liu",
            "Comment": "Good music!"
        }]
    }
    let listinfo2 = {
        "Name":"Watch Later",
        "Type":"movies",
        "Owner":"Sunii Kim",
        "Status":"public",
        "Media":[{
            "poster":"https://m.media-amazon.com/images/M/MV5BMWM4NTFhYjctNzUyNi00NGMwLTk3NTYtMDIyNTZmMzRlYmQyXkEyXkFqcGdeQXVyMTAwMzUyOTc@._V1_SX300.jpg",
            "title":"The Sixth Sense",
            "year":"1999",
            "director":"M. Night Shyamalan",
            "rating":"8.1",
            "actors":"Bruce Willis, Haley Joel Osment, Toni Collette, Olivia Williams"}]
    }

    const playlist1 = await playlists.addPlayList(listinfo1);
    const playlist2 = await playlists.addPlayList(listinfo2);

    await movies.addMovies(movieInfo)
    
    let userinfo ={
        "FirstName": "John",
        "LastName": "Doe",
        "Email": "JDoe@gmail.com",
        "Gender": "Male",
        "Location": "Hoboken",
        "AboutMe": "description",
        "Age": "25",
        "HashedPassword": bcrypt.hashSync("123456",salt).toString(), //Note: save hashed Password here
        "FavoriteMusicGenres": ["party","country"],
        "FavoriteMovieGenres": ["drama","romantic"],
        "Favorites": playlist1._id,
        "MusicLists": [],
        "MovieLists": [],
        "WatchLater": playlist2._id
    }
    const user = await users.addUser(userinfo);
    console.log(user);
    console.log(await playlists.getPlaylistByObjectId(user.Favorites))
    //const MovieLists;
    console.log("Done seeding database");
  
    await db.serverConfig.close();
  };
  
  main().catch(console.log);
  
  module.exports=main;