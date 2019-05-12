const mongoCollections = require("../databaseConfig/mongoCollection");
const users = mongoCollections.users;
const playlists = mongoCollections.playlists;
const uuid = require("node-uuid");

module.exports={
    async getAllPlaylists(){
      return playlists().then(playlistCollection => {
        return playlistCollection.find({}).toArray();
      });
    },

    async getPlaylistById(id) {
        return playlists().then(playlistCollection => {
          return playlistCollection.findOne({ _id: id }).then(playlist => {
            if (!playlist) throw "User not found";
            return playlist;
          });
        });
    },

    async watchLater(id,movie){
      if(!id||!movie){
        throw "invaild input"
      }
      let temp = this.getPlaylistById(id);

      if(temp==undefined){throw "not found"}

      temp.Media.push(movie);

      let updatedList = {
        Media :temp.Media
      };
      
      return playlistCollection.updateOne({ _id: id }, updatedList).then(() => {
        return this.getUserById(id);}
      );
    },

    async search(name){
      const allLists=this.getAllPlaylists();
      allLists.forEach(element => {
        const media = element.Media;
        let obj = media.find(o => o.Name === name);
        if(obj!=undefined){
          return obj;
        }
      });
      throw "not found"
    },

    async setPlaylistStatus(id,status){
      //status can be either public of private
      if(!status){
        return
      }
      return this.getPlaylistById(id).then(currentList => {
        let updatedList = {
          Status:status
        };
  
        return playlistCollection.updateOne({ _id: id }, updatedList).then(() => {
          return this.getUserById(id);
        });
      });
    },

    //for testing
    async addPlayList(info){
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