const { ApolloServer, gql } = require('apollo-server');

const typeDefs = `

    type Movie {
        title: String
        overview: String
        poster_path: String
        tags: [Tag]
        popularity: Float
    }

    type TvSeries {
        title: String
        overview: String
        poster_path: String
        tags: [Tag]
        popularity: Float
    }

    type Tag {
        name: String
    }

    type Entertainme {
        movies: [Movie]
        tvSeries: [TvSeries]
    }

    type Query {
        entertainme: Entertainme
    }
`

const entertainme = {
    movies: [
        {
            tags: [{
                _id: "5e45144184f936fed373d1ec",
                name: "Romance",
            }],
            _id: "5e45154b84f936fed373d1ed",
            title: "Habibie and ainun",
            overview: "lorem ipsum",
            poster_path: "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/230px-Habibie_Ainun_Poster.jpg/220px-230px-Habibie_Ainun_Poster.jpg",
            popularity: 9.9
        }
    ],
    tvSeries: [
        {
            tags: [{
                _id: "5e45144184f936fed373d1ec",
                name: "Romance",
            }],
            _id: "5e45197c84f936fed373d1ee",
            title: "Habibie and ainun 2",
            overview: "lorem ipsum",
            poster_path: "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/230px-Habibie_Ainun_Poster.jpg/220px-230px-Habibie_Ainun_Poster.jpg",
            popularity: 9.9
        }
    ],
}

const resolvers = {
    Query: {
        entertainme: () => entertainme,
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});