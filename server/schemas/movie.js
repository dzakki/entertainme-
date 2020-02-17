const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const { ApolloError } = require("apollo-server");

const apiUrl = "http://localhost:3001";

const typeDefs = `
    extend type Query {
        movies: [Movie]
        movie (id: String) : Movie
    }

    extend type Mutation {
        addMovie (title: String, overview: String, poster_path: String, popularity: Float, tags: [String]): Movie
        updateMovie (input: inputUpdateMovie, id: String): Movie
        deleteMovie (id: String): message
    }

    input inputUpdateMovie {
        title: String
        overview: String
        poster_path: String
        tags: [String]
        popularity: Float
    }

    type Movie {
        _id: String
        title: String
        overview: String
        poster_path: String
        tags: [Tag]
        popularity: Float
    }
    type message {
        text: String
    }
`;
const resolver = {
  Query: {
    movies: async () => {
      try {
        let dataMovies = await redis.hgetall("movies");

        if (Object.values(dataMovies) > 0) {
          return dataMovies;
        }
        const { data } = await axios.get(`${apiUrl}/movies`);
        dataMovies = data.reduce((acc, movie) => {
          acc.push(movie._id, JSON.stringify(movie));
          return acc;
        }, []);
        redis.hset("movies", ...dataMovies);
        redis.expire("movies", 3600);
        return data;
      } catch (error) {
        new ApolloError("failed get movies", "GET_MOVIES");
      }
    },
    movie: async (parent, args) => {
      try {
        let todo = await redis.hget("movies", args.id);
        if (todo) {
          return todo;
        }
        const { data } = await axios.get(`${apiUrl}/movies/${args.id}`);
        redis.hset("movies", args.id, JSON.stringify(data));
        redis.expire("movies", 3600);
        return data;
      } catch (error) {
        new ApolloError("failed get a movie", "GET_MOVIE");
      }
    }
  },
  Mutation: {
    addMovie: async (parent, args) => {
      try {
        const { title, overview, poster_path, popularity, tags } = args;
        const { data } = await axios.post(`${apiUrl}/movies`, {
          title,
          overview,
          poster_path,
          popularity,
          tags
        });
        redis.hset("movies", data._id, JSON.stringify(data));
        redis.expire("movies", 3600);
        return data;
      } catch (error) {
        new ApolloError(JSON.stringify(error), "ADD_MOVIE");
      }
    },
    updateMovie: async (parent, args) => {
      try {
        const { input, id } = args;
        const { data } = await axios.put(`${apiUrl}/movies/${id}`, input);
        redis.hset("movies", data._id, JSON.stringify(data));
        redis.expire("movies", 3600);
        return data;
      } catch (error) {
        new ApolloError(JSON.stringify(error), "UPDATE_MOVIE");
      }
    },
    deleteMovie: async (parent, args) => {
      try {
        const { id } = args;
        await axios.delete(`${apiUrl}/movies/${id}`);
        redis.hdel("movies", id);
        redis.expire("movies", 3600);
        return {
          text: "Deleted a movie"
        };
      } catch (error) {
        new ApolloError("failed delete a movie", "DELETE_MOVIE");
      }
    }
  }
};

module.exports = {
  typeDefs,
  resolver
};
