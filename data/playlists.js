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
    getPlaylistByName(){
      return playlists().then(playlistCollection => {
        return playlistCollection.find({}).toArray();
      });
    },
    //for testing
    addPlayList(info){
        return playlists().then(playlistCollection => {
          let newList={
            "_id": uuid.v4(),
            "Name": info.Name,
            "Type": info.Type,
            "Owner": info.Owner,
            "Status": info.Status,
            "Media": info.Media ,
            "Comments":info.Comments
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