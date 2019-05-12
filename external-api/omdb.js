const OmdbApi = require("omdb-api-pt");
const keys = require("./keys/keys");

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
const getByName = async name => {
  if (typeof name === "undefined") throw `Invalid OMDB name`;
  if (typeof name !== "string") throw `Must be of type string`;

  try {
    const response = await omdb.bySearch({
      search: name,
      plot: "full",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Makes a request to the OMDB API by movie IMDB id
 * @param {string} id IMDB id of the movie
 * @returns {Object} JSON of most relevant search results
 */
const getById = async id => {
  if (typeof id === "undefined") throw `Invalid OMDB id`;
  if (typeof id !== "string") throw `Must be of type string`;

  try {
    const response = await omdb
    .byId({
      imdb: id,
      plot: "full",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Combines the above functions to show more detailed results, since the name function shows limited results.
 * For example, calling with ("house", 0) shows detailed information for the show 'House of Cards'
 * @param {string} name Name of show to search for
 * @param {number} num Index of result to fetch detailed information for
 * @returns {object} detailed JSON of a particular show via id
 */
const getByIdByName = async (name, num) => {
  const list = await getByName(name);
  // Powerful line to make a second call via the first, allows us to 'get by id by name'
  const show = await getById(list.Search[num].imdbID);
  return show;
}

module.exports = {
  getByName,
  getById,
  getByIdByName
};