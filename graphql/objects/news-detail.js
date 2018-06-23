const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');
const ImageDetail = require('./image-detail');
const VideoDetail = require('./video-detail');
const axios = require('../../config/axios');

const NewsDetail = new GraphQLObjectType({
    name: 'NewsDetail',

    fields: {
        name: {
            type: GraphQLString,
            resolve: source => source.name
        },
        news_id: {
            type: GraphQLNonNull(GraphQLString),
            resolve: source => source.news_id
        },
        url: {
            type: GraphQLString,
            resolve: source => source.url
        },
        publication: {
            type: GraphQLString,
            resolve: source => source.publication
        },
        mission: {
            type: GraphQLString,
            resolve: source => source.mission
        },
        abstract: {
            type: GraphQLString,
            resolve: source => source.abstract
        },
        credits: {
            type: GraphQLString,
            resolve: source => source.credits
        },
        thumbnail: {
            type: GraphQLString,
            resolve: source => source.thumbnail
        },
        thumbnail_retina: {
            type: GraphQLString,
            resolve: source => source.thumbnail_retina
        },
        thumbnail_1x: {
            type: GraphQLString,
            resolve: source => source.thumbnail_1x
        },
        thumbnail_2x: {
            type: GraphQLString,
            resolve: source => source.thumbnail_2x
        },
        keystone_image_1x: {
            type: GraphQLString,
            resolve: source => source.keystone_image_1x
        },
        keystone_image_2x: {
            type: GraphQLString,
            resolve: source => source.keystone_image_2x
        },
        release_images: {
            type: GraphQLList(ImageDetail),
            resolve(source) {
                return source.release_images
                    ? Promise.all(source.release_images.map(async imageId => {
                        const path = `/image/${imageId}`;
                        const {data} = await axios.get(path);
                        return data;
                    }))
                    : [];
            }
        },
        release_videos: {
            type: GraphQLList(VideoDetail),
            resolve(source) {
                return source.release_videos
                    ? Promise.all(source.release_videos.map(async videoId => {
                        const path = `/video/${videoId}`;
                        const {data} = await axios.get(path);
                        return data;
                    }))
                    : [];
            }
        }
    }
});

const rootQuery = {
    type: NewsDetail,

    args: {
        which: {
            type: GraphQLNonNull(GraphQLString)
        }
    },

    async resolve(source, args) {
        const path = `/news_release/${args.which}`;
        const {data} = await axios.get(path);
        return data;
    }
};

NewsDetail.rootQuery = rootQuery;

module.exports = NewsDetail;
