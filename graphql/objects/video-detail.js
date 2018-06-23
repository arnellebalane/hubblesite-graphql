const {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');
const axios = require('../../config/axios');

const VideoFile = new GraphQLObjectType({
    name: 'VideoFile',

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
        },
        frame_rate: {
            type: GraphQLInt,
            resolve: source => source.frame_rate
        },
        format: {
            type: GraphQLString,
            resolve: source => source.format
        }
    }
});

const VideoDetail = new GraphQLObjectType({
    name: 'VideoDetail',

    fields: {
        name: {
            type: GraphQLString,
            resolve: source => source.name
        },
        short_description: {
            type: GraphQLString,
            resolve: source => source.short_description
        },
        youtube_id: {
            type: GraphQLString,
            resolve:  source => source.youtube_id
        },
        teachertube_id: {
            type: GraphQLString,
            resolve: source => source.teachertube_id
        },
        credits: {
            type:  GraphQLString,
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
        image: {
            type: GraphQLString,
            resolve: source => source.image
        },
        image_retina: {
            type: GraphQLString,
            resolve: source => source.image_retina
        },
        html_5_video: {
            type: GraphQLString,
            resolve: source => source.html_5_video
        },
        video_files: {
            type: GraphQLList(VideoFile),
            resolve: source => source.video_files
        }
    }
});

const rootQuery = {
    type: VideoDetail,

    args: {
        video_id: {
            type: GraphQLNonNull(GraphQLInt)
        }
    },

    async resolve(source, args) {
        const path = `/video/${args.video_id}`;
        const {data} = await axios.get(path);
        return data;
    }
};

VideoDetail.rootQuery = rootQuery;

module.exports = VideoDetail;
