const { ObjectId } = require('mongodb')
const mongoCollections = require("../databaseConfig/mongoCollection");
const playlists = mongoCollections.playlists;

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

async function setPlaylistStatus(id,status) {
  if(!status || !id) {
    return
  }

  return this.getPlaylistById(id).then(currentList => {
    updatedList = currentList;
    updatedList.Status = status;

  return playlists().then(playlistCollection => {
    return playlistCollection.findOneAndUpdate({ _id: ObjectId.createFromHexString(id) }, updatedList).then(() => {
      return this.getPlaylistById(id);
    });
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
            return getPlaylistByObjectId(newId);
          });
  });
}

function getUnique(arr, comp) {
  const unique = arr
       .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e]).map(e => arr[e]);
   return unique;
}

async function addToPlaylist(media, playlistId) {
  if(media.length === 0) {
    return
  }
  console.log('THIS HAS ENETERED HERE', media);
  return this.getPlaylistById(playlistId).then(currentList => {
    updatedList = currentList;
    console.log('THIS IS THE TEST:', updatedList);
    updatedList.Media = updatedList.Media.concat(media);
    if(currentList.Type === 'movies') {
      updatedList.Media = getUnique(updatedList.Media, 'title');
    } else {
      updatedList.Media = getUnique(updatedList.Media, 'name')
    }
    
  return playlists().then(playlistCollection => {
    return playlistCollection.findOneAndUpdate({ _id: ObjectId.createFromHexString(playlistId) }, updatedList).then(() => {
      return this.getPlaylistById(playlistId);
    });
  });
});
}

module.exports = {
  getAllPlaylists,
  getPlaylistByObjectId,
  getPlaylistById,
  getPlaylistByObjectId,
  search,
  setPlaylistStatus,
  addPlayList,
  addToPlaylist
}
