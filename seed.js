const dbConnection = require("./databaseConfig/mongoConnection");
const data = require("./data/");
const users = data.users;
const playlists = data.playlists;
const movies = data.movies;
const movieInfo = require("./movieInfo")

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();
    
    let listinfo1 ={"Name":"Favorites","Type":"music","Owner":"JStevens@gmail.com","Status":"public","Media":[{"name":"Judas","artist":"Lady Gaga","artistUrl":"https://open.spotify.com/artist/1HY2Jd0NmPuamShAr6KMms","previewUrl":""},{"name":"Fantasy - Single Version","artist":"Earth, Wind & Fire","artistUrl":"https://open.spotify.com/artist/4QQgXkCYTt3BlENzhyNETg","previewUrl":"https://p.scdn.co/mp3-preview/748c956b57223b2fa392494c7780be4918cfac48?cid=e88b693ca0154aada66f12b2499f8b65"}]}
    let listinfo2 = {   "Name":"Watch Later","Type":"movies","Owner":"JStevens@gmail.com","Status":"public","Media":[{"poster":"https://m.media-amazon.com/images/M/MV5BYWIwNWMwNjAtZGU1OS00MDQxLWI5YjgtMzBhODY3YzIzM2Q0XkEyXkFqcGdeQXVyMjExMjk0ODk@._V1_SX300.jpg","title":"CSI: Immortality","year":"2015","director":"Louis Shaw Milito, Louis Shaw Milito","rating":"7.6","actors":"Ted Danson, Jorja Fox, Eric Szmanda, Robert David Hall"}]}

    let listinfo3 ={"Name":"Favorites","Type":"music","Owner":"RStevens@gmail.com","Status":"public","Media":[{"name":"Judas","artist":"Lady Gaga","artistUrl":"https://open.spotify.com/artist/1HY2Jd0NmPuamShAr6KMms","previewUrl":""},{"name":"Fantasy - Single Version","artist":"Earth, Wind & Fire","artistUrl":"https://open.spotify.com/artist/4QQgXkCYTt3BlENzhyNETg","previewUrl":"https://p.scdn.co/mp3-preview/748c956b57223b2fa392494c7780be4918cfac48?cid=e88b693ca0154aada66f12b2499f8b65"}]}
    let listinfo4 = {   "Name":"Watch Later","Type":"movies","Owner":"RStevens@gmail.com","Status":"public","Media":[{"poster":"https://m.media-amazon.com/images/M/MV5BYWIwNWMwNjAtZGU1OS00MDQxLWI5YjgtMzBhODY3YzIzM2Q0XkEyXkFqcGdeQXVyMjExMjk0ODk@._V1_SX300.jpg","title":"CSI: Immortality","year":"2015","director":"Louis Shaw Milito, Louis Shaw Milito","rating":"7.6","actors":"Ted Danson, Jorja Fox, Eric Szmanda, Robert David Hall"}]}


    const playlist1 = await playlists.addPlayList(listinfo1);
    const playlist2 = await playlists.addPlayList(listinfo2);

    const playlist3 = await playlists.addPlayList(listinfo3);
    const playlist4 = await playlists.addPlayList(listinfo4);

    await movies.addMovies(movieInfo)
    
    let userinfo ={"FirstName":"John",
    "LastName":"Stevens",
    "Email":"JStevens@gmail.com",
    "Gender":"Male",
    "Location":"West New York",
    "Age":"33",
    "HashedPassword":"$2a$08$PbNEbd.ulF4qBvfb7H6ed.8h8zFuS.S8Y4WMpo/Ul93Qn7WlP/Gcm",
    "FavoriteMusicGenres":["disco","electronic"],
    "FavoriteMovieGenres":["crime","romantic"],
    "Favorites": playlist1._id,
    "WatchLater":playlist2._id
}

let userinfo2 ={"FirstName":"Rob",
    "LastName":"Stevens",
    "Email":"RStevens@gmail.com",
    "Gender":"Male",
    "Location":"West New York",
    "Age":"32",
    "HashedPassword":"$2a$08$PbNEbd.ulF4qBvfb7H6ed.8h8zFuS.S8Y4WMpo/Ul93Qn7WlP/Gcm",
    "FavoriteMusicGenres":["disco","electronic", "rock"],
    "FavoriteMovieGenres":["crime","romantic"],
    "Favorites": playlist3._id,
    "WatchLater":playlist4._id
}
    const user = await users.addUser(userinfo);
    const user2 = await users.addUser(userinfo2)
    console.log(user);
    console.log(user2);
    console.log(await playlists.getPlaylistByObjectId(user.Favorites));
    console.log(await playlists.getPlaylistByObjectId(user2.Favorites))
    //const MovieLists;
    console.log("Done seeding database");
  
    await db.serverConfig.close();
  };
  
  main().catch(console.log);
  
  module.exports=main;