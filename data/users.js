const mongoCollections = require("../databaseConfig/mongoCollection");
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
  //things you want to show on webpage, definately not include password
  console.log("THIS IS HTE PROFILE:", profile);
  return {
    Name: profile.FullName,
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
  loginMatch,
  registration,
  addUser
}
