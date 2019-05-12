const mongoCollections = require("../databaseConfig/mongoCollection");
const users = mongoCollections.users;
const playlists = mongoCollections.playlists;

async function getAllUsers(){
  return users().then(userCollection => {
    return userCollection.find({}).toArray();
  });
}
async function getUserById(id) {
  const objId = require('mongodb').ObjectID;
    var obj;
    try {
      obj=new objId(id);
    } catch (error) {
      throw "No animal with that id";
    }
    return users().then(userCollection => {
      return userCollection.findOne({ _id: obj }).then(user => {
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
      const profile = await addUser(Userinfo);
      //things you want to show on webpage, definately not include password
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

    //for testing
    async function addUser(info){
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
            WatchLater: info.WatchLater,
            //_id: uuid.v4()
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
  accessProfile,
  WatchLater,
  addUser
 }