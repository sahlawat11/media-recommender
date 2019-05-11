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
            firstName: info.firstName,
            lastName: info.lastName,
            Email: info.Email,
            Gender: info.Gender,
            Location: info.Location,
            Age: info.age,
            Password: info.hashedPassward,
            favoriteMusicGenres: info.favoriteMusicGenres,
            favoriteMovieGenres: info.favoriteMovieGenres,
            Favorites: info.Favorites,
            musicLists: info.musicLists,
            movieLists: info.movieLists,
            watchLater: info.watchLater,
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
    }
}