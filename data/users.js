const mongoCollections = require("../databaseConfig/mongoCollection");
const users = mongoCollections.users;
const playlists = mongoCollections.playlists;
const uuid = require("node-uuid");

module.exports={
    getAllUsers(){
      return users().then(userCollection => {
        return userCollection.find({}).toArray();
      });
    },
    getUserById(id) {
        return users().then(userCollection => {
          return userCollection.findOne({ _id: id }).then(user => {
            if (!user) throw "User not found";
            return user;
          });
        });
    },
    getUserByName(name){      
      return users().then(userCollection => {
        return userCollection.findOne({ FullName: name }).then(user => {
          if (!user) throw "User "+name+" not found";
          return user;
        });
      });
    },
    loginMatch(Email,HashedPassword){
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
    },
    registration(Userinfo){
      const profile = addUser(Userinfo);
      //things you want to show on webpage, definately not include password
      return {
        Name: profile.FullName,
        Email: info.Email,
        Gender: info.Gender,
        Location: info.Location,
        Age: info.Age,
        FavoriteMusicGenres: info.FavoriteMusicGenres,
        FavoriteMovieGenres: info.FavoriteMovieGenres,
        Favorites: info.Favorites,
        MusicLists: info.MusicLists,
        MovieLists: info.MovieLists,
        WatchLater: info.WatchLater,
      }
    },

    //for testing
    addUser(info){
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
            _id: uuid.v4()
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
    },
}