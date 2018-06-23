const {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');
const axios = require('../../config/axios');

const ImageItem = new GraphQLObjectType({
    name: 'ImageItem',

    fields: {
        id: {
            type: GraphQLNonNull(GraphQLInt),
            resolve: source => source.id
        },
        name: {
            type: GraphQLString,
            resolve: source => source.name
        },
        news_name: {
            type: GraphQLString,
            resolve: source => source.news_name
        },
        collection: {
            type: GraphQLString,
            resolve: source => source.collection
        },
        mission: {
            type: GraphQLString,
            resolve: source => source.mission
        }
    }
});

const rootQuery = {
    type: GraphQLList(ImageItem),

    args: {
        collection_name: {
            type: GraphQLString,
            defaultValue: 'science'
        },
        page: {
            type: GraphQLString,
            defaultValue: 1
        }
    },

    async resolve(source, args) {
        const path = `/images/${args.collection_name}`;
        const {data} = await axios.get(path, {
            params: {
                page: args.page
            }
        });
        return data;
    }
};

ImageItem.rootQuery = rootQuery;

module.exports = ImageItem;
