const { Sequelize } = require('sequelize');
const { getCachedData, setCachedData } = require('./cache');
const { sequelize } = require("../database/connection");

// Save the original query and findAll methods
const originalQuery = sequelize.query.bind(sequelize);
const originalFindAll = Sequelize.Model.findAll;

// Extend the Sequelize prototype to add a cache method
Sequelize.Model.prototype.cache = function (ttl = 60) {
  this.useCache = true;
  this.cacheTTL = ttl;
  return this;
};


// sequelize.query = async function (sql, options = {}) {

//   if (options.useCache) {
//     const key = `query:${JSON.stringify({ sql, options })}`;
//     try {
//       // Try to get the cached result
//       const cachedResult = await getCachedData(key);
//       if (cachedResult) {
//         console.log('Cache hit!');
//         return cachedResult;
//       }
//     } catch (error) {
//       console.error('Error retrieving from cache:', error);
//     }

//     // Cache miss; execute the query
//     const result = await originalQuery(sql, options);

//     // Cache the result
//     try {
//       await setCachedData(key, result, options.cacheTTL || 60);
//     } catch (error) {
//       console.error('Error setting cache:', error);
//     }

//     return result;
//   } else {
//     // If caching is not enabled, execute the query directly
//     return originalQuery(sql, options);
//   }
// };

Sequelize.Model.findAll = async function (options = {}) {
  if (options.useCache) {
    console.log("useCache true in findAll");
    const key = `findAll:${this.name}:${JSON.stringify(options)}`;

    try {
      // Try to get the cached result
      const cachedResult = await getCachedData(key);
      console.log("Cached result received:", cachedResult); // This log confirms that cached data was received

      if (cachedResult) {
        console.log('Cache hit!', cachedResult);

        const parsedResult = JSON.parse(cachedResult); // Parse the JSON string to convert it into a JavaScript object

        console.log('Returning cached instances!', parsedResult);
        return parsedResult;
      } else {
        console.log("Cache miss: No data found in cache.");
      }
    } catch (error) {
      console.error('Error retrieving from cache:', error);
    }

    // Cache miss; execute the original findAll query
    const result = await originalFindAll.call(this, options);
    console.log("Cache miss; executing query", result);

    // Cache the result
    try {
      await setCachedData(key, JSON.stringify(result), options.cacheTTL || 60);
      console.log('New data cached successfully.');
    } catch (error) {
      console.error('Error setting cache:', error);
    }

    return result;
  } else {
    // If caching is not enabled, execute the original findAll query directly
    return originalFindAll.call(this, options);
  }
};

module.exports = sequelize;
