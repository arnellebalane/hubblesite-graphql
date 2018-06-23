const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');
const RSSPostItem = require('./rss-post-item');
const axios = require('../../config/axios');


const rootQuery = {
    type: GraphQLList(RSSPostItem),

    args: {
        feed_name: {
            type: GraphQLNonNull(GraphQLString)
        },
        page: {
            type: GraphQLString,
            defaultValue: 1
        },
        sort: {
            type: GraphQLString,
            defaultValue: '-pub_date'
        }
    },

    async resolve(source, args) {
        const path = `/external_feed/${args.feed_name}`;
        const {data} = await axios.get(path, {
            params: {
                page: args.page,
                sort: args.sort
            }
        });
        return data;
    }
};

module.exports = {
    rootQuery
};
