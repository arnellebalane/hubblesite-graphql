const {
    GraphQLSchema,
    GraphQLObjectType
} = require('graphql');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootType',

        fields: {
            news: require('./objects/news').rootQuery
        }
    })
});

module.exports = schema;
