const {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');
const axios = require('../../config/axios');

const ImageFile = new GraphQLObjectType({
    name: 'ImageFile',

    fields: {
        file_url: {
            type: GraphQLString,
            resolve: source => source.file_url
        },
        file_size: {
            type: GraphQLInt,
            resolve: source => source.file_size
        },
        width: {
            type: GraphQLInt,
            resolve: source => source.width
        },
        height: {
            type: GraphQLInt,
            resolve: source => source.height
        }
    }
});

const ImageDetail = new GraphQLObjectType({
    name: 'ImageDetail',

    fields: {
        name: {
            type: GraphQLString,
            resolve: source => source.name
        },
        description: {
            type: GraphQLString,
            resolve: source => source.description
        },
        credits: {
            type: GraphQLString,
            resolve: source => source.credits
        },
        news_name: {
            type: GraphQLString,
            resolve: source => source.news_name
        },
        mission: {
            type: GraphQLString,
            resolve: source => source.mission
        },
        collection: {
            type: GraphQLString,
            resolve: source => source.collection
        },
        image_files: {
            type: GraphQLList(ImageFile),
            resolve: source => source.image_files
        }
    }
});

const rootQuery = {
    type: ImageDetail,

    args: {
        image_id: {
            type: GraphQLNonNull(GraphQLInt)
        }
    },

    async resolve(source, args) {
        const path = `/image/${args.image_id}`;
        const {data} = await axios.get(path);
        return data;
    }
};

ImageDetail.rootQuery = rootQuery;

module.exports = ImageDetail;
