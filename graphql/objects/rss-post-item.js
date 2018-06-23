const {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');
const axios = require('../../config/axios');

const RSSPostItem = new GraphQLObjectType({
    name: 'RSSPostItem',

    fields: {
        title: {
            type: GraphQLString,
            resolve: source => source.title
        },
        pub_date: {
            type: GraphQLString,
            resolve: source => source.title
        },
        description: {
            type: GraphQLString,
            resolve: source => source.description
        },
        guid: {
            type: GraphQLString,
            resolve: source => source.guid
        },
        image: {
            type: GraphQLString,
            resolve: source => source.image
        },
        image_square: {
            type: GraphQLString,
            resolve: source => source.image_square
        },
        image_square_large: {
            type: GraphQLString,
            resolve: source => source.image_source_large
        },
        thumbnail: {
            type: GraphQLString,
            resolve: source => source.thumbnail
        },
        thumbnail_large: {
            type: GraphQLString,
            resolve: source => source.thumbnail_large
        }
    }
});

const rootQuery = {
    type: RSSPostItem,

    args: {
        feed_name: {
            type: GraphQLNonNull(GraphQLString)
        },
        pubdate: {
            type: GraphQLNonNull(GraphQLString)
        }
    },

    async resolve(source, args) {
        const path = `/external_feed/${args.feed_name}/${args.pubdate}`;
        const {data} = await axios.get(path);
        return data;
    }
};

RSSPostItem.rootQuery = rootQuery;

module.exports = RSSPostItem;
