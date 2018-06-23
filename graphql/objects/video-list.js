const {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');
const axios = require('../../config/axios');

const VideoList = new GraphQLObjectType({
    name: 'VideoList',

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
        image: {
            type: GraphQLString,
            resolve: source => source.image
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
    type: GraphQLList(VideoList),

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
        const path = `/videos/${args.collection_name}`;
        const {data} = await axios.get(path, {
            params: {
                page: args.page
            }
        });
        return data;
    }
};

VideoList.rootQuery = rootQuery;

module.exports = VideoList;
