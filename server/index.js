const { ApolloServer, makeExecutableSchema } = require('apollo-server');

const movie = require('./schemas/movie');
const tvSeries = require('./schemas/tvSeries');
const tag = require('./schemas/tag')

const typeDefs = `
    type Query
    type Mutation
`
const schema = makeExecutableSchema({
    typeDefs: [typeDefs, movie.typeDefs, tvSeries.typeDefs, tag],
    resolvers: [movie.resolver, tvSeries.resolver]
})

const server = new ApolloServer({schema});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});