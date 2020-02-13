const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = `
    extend type Query {
        movies: [Movie]
    }
    type Movie {
        title: String
        overview: String
        poster_path: String
        tags: [Tag]
        popularity: Float
    }
`
const resolver = {
    Query: {
        movies: async () => {
            const dataCache = await redis.get('movies')
            let result = JSON.parse(dataCache)
            if (dataCache) {
                const { data } = await axios.get('http://localhost:3001/movies')
                await redis.set('movies', JSON.stringify(data))
                result = data   
            }
            return result
        }
    }
}

module.exports = {
    typeDefs,
    resolver,
}