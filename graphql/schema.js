const {
    GraphQLSchema,
    GraphQLObjectType
} = require('graphql');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootType',

        fields: {
            news_list: require('./objects/news-list').rootQuery,
            news_detail: require('./objects/news-detail').rootQuery,
            image_list: require('./objects/image-list').rootQuery,
            image_detail: require('./objects/image-detail').rootQuery,
            video_list: require('./objects/video-list').rootQuery,
            video_detail: require('./objects/video-detail').rootQuery
        }
    })
});

module.exports = schema;
