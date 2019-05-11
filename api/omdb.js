const OmdbApi = require("omdb-api-pt");
const keys = require("./keys");

// Create instance of the module
const omdb = new OmdbApi({
  apiKey: keys.omdbKey,
  baseUrl: "https://omdbapi.com/"
});

/**
 * Makes a request to the OMDB API by movie name
 * @param {string} name Name of the movie
 * @returns {Object} JSON of most relevant search results
 */
const getByName = async (name) => {
  if (typeof name === "undefined") throw `Invalid OMDB name`;
  if (typeof name !== "string") throw `Must be of type string`;

  const find = omdb
    .bySearch({
      search: name,
      plot: "full",
      tomatoes: true
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));

  return find;
}

/**
 * Makes a request to the OMDB API by movie IMDB id
 * @param {string} id IMDB id of the movie
 * @returns {Object} JSON of most relevant search results
 */
const getById = async (id) => {
  if (typeof id === "undefined") throw `Invalid OMDB id`;
  if (typeof id !== "string") throw `Must be of type string`;

  const find = omdb
    .byId({
      imdb: id,
      plot: "full",
      tomatoes: true
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));

  return find;
}

module.exports = {
  getByName,
  getById
};
