const mongoCollections = require("../databaseConfig/mongoCollection");
const users = mongoCollections.users;
const uuid = require("node-uuid");

module.exports={
    getUserById(id) {
        return users().then(userCollection => {
          return userCollection.findOne({ _id: id }).then(user => {
            if (!user) throw "User not found";
            return user;
          });
        });
    },

    //for testing
    addUser(info){
      return users().then(usersCollection => {
        let newUser={
            FirstName: info.firstName,
            LastName: info.lastName,
            Email: info.Email,
            Gender: info.Gender,
            Location: info.Location,
            Age: info.Age,
            HashedPassword: info.HashedPassward,
            FavoriteMusicGenres: info.FavoriteMusicGenres,
            FavoriteMovieGenres: info.FavoriteMovieGenres,
            Favorites: info.Favorites,
            MusicLists: info.MusicLists,
            MovieLists: info.MovieLists,
            WatchLater: info.MatchLater,
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