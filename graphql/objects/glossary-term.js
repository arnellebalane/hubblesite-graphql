const {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');
const axios = require('../../config/axios');

const GlossaryTerm = new GraphQLObjectType({
    name: 'GlossaryTerm',

    fields: {
        definition: {
            type: GraphQLString,
            resolve: source => source.definition
        }
    }
});

const rootQuery = {
    type: GlossaryTerm,

    args: {
        term: {
            type: GraphQLNonNull(GraphQLString)
        }
    },

    async resolve(source, args) {
        const path = `/glossary/${args.term}`;
        const {data} = await axios.get(path);
        return data;
    }
};

GlossaryTerm.rootQuery = rootQuery;

module.exports = GlossaryTerm;
