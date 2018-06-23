const {
    GraphQLSchema,
    GraphQLObjectType
} = require('graphql');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootType',

        fields: {

        }
    })
});

module.exports = schema;
