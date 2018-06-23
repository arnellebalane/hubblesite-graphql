const {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');
const axios = require('../../config/axios');

const GlossaryItem = new GraphQLObjectType({
    name: 'GlossaryItem',

    fields: {
        name: {
            type: GraphQLString,
            resolve: source => source.name
        },
        definition: {
            type: GraphQLString,
            resolve: source => source.definition
        }
    }
});

const rootQuery = {
    type: GraphQLList(GlossaryItem),

    args: {
        page: {
            type: GraphQLString,
            defaultValue: 1
        }
    },

    async resolve(source, args) {
        const {data} = await axios.get('/glossary', {
            params: {
                page: args.page
            }
        });
        return data;
    }
};

GlossaryItem.rootQuery = rootQuery;

module.exports = GlossaryItem;
