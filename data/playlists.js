const mongoCollections = require("../databaseConfig/mongoCollection");
const playlists = mongoCollections.playlists;
const uuid = require("node-uuid");

module.exports={
    getPlaylistById(id) {
        return playlists().then(playlistCollection => {
          return playlistCollection.findOne({ _id: id }).then(playlist => {
            if (!playlist) throw "User not found";
            return playlist;
          });
        });
    },
    addPlayList(info){
        return playlists().then(playlistCollection => {
          let newList={
            "_id": uuid.v4(),
            "name": info.name,
            "type": info.type,
            "Owner": info.Owner,
            "status": info.status,
            "Items": info.Items,
            "comments":info.comments
          };
  
          return playlistCollection
              .insertOne(newList)
              .then(newInsertInformation => {
                  return newInsertInformation.insertedId;
                })
                .then(newId => {
                  return this.getPlaylistById(newId);
                });
        });
      }
}