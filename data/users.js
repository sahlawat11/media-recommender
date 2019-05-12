const mongoCollections = require("../databaseConfig/mongoCollection");
const { ObjectId } = require('mongodb')
const users = mongoCollections.users;
const playlists = mongoCollections.playlists;
const uuid = require("node-uuid");


async function getAllUsers(){
  return users().then(userCollection => {
    return userCollection.find({}).toArray();
  });
}

async function getUserById(id) {
  return users().then(userCollection => {
    return userCollection.findOne({ _id: id }).then(user => {
      if (!user) throw "User not found";
      return user;
    });
  });
}

async function getUserByName(name){      
  return users().then(userCollection => {
    return userCollection.findOne({ FullName: name }).then(user => {
      if (!user) throw "User "+name+" not found";
      return user;
    });
  });
}

async function getUserByEmail(email){      
  return users().then(userCollection => {
    return userCollection.findOne({ Email: email }).then(user => {
      if (!user) throw "User with email: "+value+" not found";
      return user;
    });
  });
}

async function loginMatch(Email,HashedPassword){
  if(!Email){
    throw "must provide a user name"
  }
  if(!HashedPassword){
    throw "must provide a password"
  }
  const AllUsers = this.getAllUsers();
  AllUsers.forEach(element => {
    if(element.Email===Email&&element.HashedPassword){
      return true;
    }
  });

  throw "UserName or password incorrect"
}

async function registration(Userinfo){
  const profile = await this.addUser(Userinfo);
  console.log("THIS IS HTE PROFILE:", profile);
  return {
    FirstName: profile.FirstName,
    LastName: profile.LastName,
    Email: profile.Email,
    Gender: profile.Gender,
    Location: profile.Location,
    Age: profile.Age,
    FavoriteMusicGenres: profile.FavoriteMusicGenres,
    FavoriteMovieGenres: profile.FavoriteMovieGenres,
    Favorites: profile.Favorites,
    MusicLists: profile.MusicLists,
    MovieLists: profile.MovieLists,
    WatchLater: profile.WatchLater,
  }
}

async function accessProfile(UserId){
  const profile = this.getUserById(UserId);
  if(!profile){throw "not found"}
  let music=[],movie=[];
  (profile.MusicLists).forEach(element => {
    const info = playlists.getPlaylistById(id);
    if(info.Status=="public"){
      music.push(info);
    }
  });
  (profile.MovieLists).forEach(element => {
    const info = playlists.getPlaylistById(id);
    if(info.Status=="public"){
      movie.push(info);
    }
  });

  return {
    Name: profile.FullName,
    Email: profile.Email,
    Gender: profile.Gender,
    Location: profile.Location,
    Age: profile.Age,
    FavoriteMusicGenres: profile.FavoriteMusicGenres,
    FavoriteMovieGenres: profile.FavoriteMovieGenres,
    Favorites: profile.Favorites,
    MusicLists: music,
    MovieLists: movie,
    WatchLater: profile.WatchLater
  }
}

async function WatchLater(id,movie){
  //status can be either public of private
  if(!id||!movie){
    throw "imcomplete info"
  }
  return this.getPlaylistById(id).then(currentList => {
    let updatedList = {
      Status:status
    };

    return playlistCollection.updateOne({ _id: id }, updatedList).then(() => {
      return this.getUserById(id);
    });
  });
}

async function addUser(info){
  console.log('THIS IS THE PROBLEM HERE:', info);
  return users().then(usersCollection => {
    let newUser={
        FirstName: info.FirstName,
        LastName: info.LastName,
        FullName: info.FirstName+" "+info.LastName,
        Email: info.Email,
        Gender: info.Gender,
        Location: info.Location,
        Age: info.Age,
        HashedPassword: info.HashedPassword,
        FavoriteMusicGenres: info.FavoriteMusicGenres,
        FavoriteMovieGenres: info.FavoriteMovieGenres,
        Favorites: info.Favorites,
        MusicLists: info.MusicLists,
        MovieLists: info.MovieLists,
        WatchLater: info.WatchLater
        // _id: uuid.v4()
    };

    return usersCollection
        .insertOne(newUser)
        .then(newInsertInformation => {
            return newInsertInformation.insertedId;
          })
          .then(newId => {
            return this.getUserById(newId);
          });
  });
}
module.exports={
  getAllUsers,
  getUserById,
  getUserByName,
  getUserByEmail,
  loginMatch,
  registration,
  accessProfile,
  WatchLater,
  addUser
}
