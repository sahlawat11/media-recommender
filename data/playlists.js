const { ObjectId } = require('mongodb')
const mongoCollections = require("../databaseConfig/mongoCollection");
const playlists = mongoCollections.playlists;

<<<<<<< HEAD
    async function getAllPlaylists(){
      return playlists().then(playlistCollection => {
        return playlistCollection.find({}).toArray();
      });
    }

    async function getPlaylistById(id) {
      const objId = require('mongodb').ObjectID;
      var obj;
      try {
        obj=new objId(id);
      } catch (error) {
      throw "No animal with that id";
      }
        return playlists().then(playlistCollection => {
          return playlistCollection.findOne({ _id: obj }).then(playlist => {
            if (!playlist) throw "User not found";
            return playlist;
          });
        });
    }

    async function watchLater(id,movie){
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
    }

    async function search(name){
      const allLists=this.getAllPlaylists();
      allLists.forEach(element => {
        const media = element.Media;
        let obj = media.find(o => o.Name === name);
        if(obj!=undefined){
          return obj;
        }
      });
      throw "not found"
    }

    async function setPlaylistStatus(id,status){
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
    }

    //for testing
    async function addPlayList(info){
        return playlists().then(playlistCollection => {
          let newList={
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

      module.exports={
        getAllPlaylists,
        getPlaylistById,
        watchLater,
        search,
        setPlaylistStatus,
        addPlayList
      }
=======
async function getAllPlaylists(){
  return playlists().then(playlistCollection => {
    return playlistCollection.find({}).toArray();
  });
}

async function getPlaylistById(id) {
  postParsedId = ObjectId.createFromHexString(id);
  return playlists().then(playlistCollection => {
    return playlistCollection.findOne({ _id: postParsedId }).then(playlist => {
      if (!playlist) throw "User not found";
      return playlist;
    });
  });
}

async function getPlaylistByObjectId(id) {
  return playlists().then(playlistCollection => {
    return playlistCollection.findOne({ _id: id }).then(playlist => {
      if (!playlist) throw "Playlist not found";
      return playlist;
    });
  });
}

async function search(name){
  const allLists=this.getAllPlaylists();
  allLists.forEach(element => {
    const media = element.Media;
    let obj = media.find(o => o.Name === name);
    if(obj!=undefined){
      return obj;
    }
  });
  throw "not found"
}

async function setPlaylistStatus(id,status){
  if(!status) {
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
}

async function addPlayList(info){
  return playlists().then(playlistCollection => {
    let newList={
      "Name": info.Name,
      "Type": info.Type,
      "Owner": info.Owner,
      "Status": info.Status,
      "Media": info.Media
    };

    return playlistCollection
        .insertOne(newList)
        .then(newInsertInformation => {
            return newInsertInformation.insertedId;
          })
          .then(newId => {
            return this.getPlaylistByObjectId(newId);
          });
  });
}

module.exports = {
  getAllPlaylists,
  getPlaylistById,
  search,
  setPlaylistStatus,
  addPlayList
}
>>>>>>> 7a9414fc864a7798eefe559a9fda6a935279526c
