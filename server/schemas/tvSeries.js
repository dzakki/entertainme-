const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const { ApolloError } = require("apollo-server");
const apiUrl = "http://35.198.240.72:3002";

const typeDefs = `
    extend type Query {
        tvSeries: [TvSeries]
        tvSeriesById (id: String) : TvSeries
    }
    extend type Mutation {
        addTvSeries (input: inputTvSeries!) : TvSeries
        updateTvSeries (input: inputTvSeries!, id: String) : TvSeries
        deleteTvSeries (id: String) : message
    }
    input inputTvSeries {
        title: String
        overview: String
        poster_path: String
        tags: [String]
        popularity: Float
    }
    type TvSeries {
        _id: String
        title: String
        overview: String
        poster_path: String
        tags: [Tag]
        popularity: Float
    }
`;

const resolver = {
  Query: {
    tvSeries: async () => {
      try {
        let dataTvSeries = await redis.hgetall("tvseries");

        if (Object.values(dataTvSeries) > 0) {
          return dataTvSeries;
        }
        const { data } = await axios.get(`${apiUrl}/tv`);
        dataTvSeries = data.reduce((acc, tvSeries) => {
          acc.push(tvSeries._id, JSON.stringify(tvSeries));
          return acc;
        }, []);
        redis.hset("tvseries", ...dataTvSeries);
        redis.expire("tvseries", 3600);
        return data;
      } catch (error) {
        new ApolloError("failed get tv series", "GET_TVSERIES");
      }
    },
    tvSeriesById: async (parent, args) => {
      try {
        let tvSeriesCache = await redis.hget("tvseries", args.id);
        if (tvSeriesCache) {
          return JSON.parse(tvSeriesCache);
        }
        const { data } = await axios.get(`${apiUrl}/tv/${args.id}`);
        redis.hset("tvseries", args.id, JSON.stringify(data));
        redis.expire("tvseries", 3600);
        return data;
      } catch (error) {
        new ApolloError("failed get a tv series", "GET_TVSERIES_BY_ID");
      }
    }
  },
  Mutation: {
    addTvSeries: async (parent, args) => {
      try {
        const { input } = args;
        const { data } = await axios.post(`${apiUrl}/tv`, input);
        redis.hset("tvseries", data._id, JSON.stringify(data));
        redis.expire("tvseries", 3600);
        return data;
      } catch (error) {
        new ApolloError(JSON.stringify(error), "ADD_TVSERIES");
      }
    },
    updateTvSeries: async (parent, args) => {
      try {
        const { input, id } = args;
        const { data } = await axios.put(`${apiUrl}/tv/${id}`, input);
        redis.hset("tvseries", data._id, JSON.stringify(data));
        redis.expire("tvseries", 3600);
        return data;
      } catch (error) {
        new ApolloError(JSON.stringify(error), "UPDATE_TVSERIES");
      }
    },
    deleteTvSeries: async (parent, args) => {
      try {
        const { id } = args;
        await axios.delete(`${apiUrl}/tv/${id}`);
        redis.hdel("tvseries", id);
        redis.expire("tvseries", 3600);
        return {
          text: "Deleted a movie"
        };
      } catch (error) {
        new ApolloError("failed delete a movie", "DELETE_TVSERIES");
      }
    }
  }
};

module.exports = {
  typeDefs,
  resolver
};
