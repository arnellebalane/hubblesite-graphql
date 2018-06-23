const {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');
const axios = require('../../config/axios');

const ImageList = new GraphQLObjectType({
    name: 'ImageList',

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
    type: GraphQLList(ImageList),

    args: {
        collection_name: {
            type: GraphQLString,
            defaultValue: 'science',
            description: [

            ].join('\n')
        },
        page: {
            type: GraphQLString,
            defaultValue: 1,
            description: [

            ].join('\n')
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

ImageList.rootQuery = rootQuery;

module.exports = ImageList;
