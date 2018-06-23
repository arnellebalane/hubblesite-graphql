const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');
const axios = require('../../config/axios');

const NewsItem = new GraphQLObjectType({
    name: 'NewsItem',

    fields: {
        news_id: {
            type: GraphQLNonNull(GraphQLString),
            resolve: source => source.news_id
        },
        name: {
            type: GraphQLString,
            resolve: source => source.news_id
        },
        url: {
            type: GraphQLString,
            resolve: source => source.url
        }
    }
});

const rootQuery = {
    type: GraphQLList(NewsItem),

    args: {
        page: {
            type: GraphQLString,
            defaultValue: 1
        }
    },

    async resolve(source, args) {
        const {data} = await axios.get('/news', {
            params: {
                page: args.page
            }
        });
        return data;
    }
};

NewsItem.rootQuery = rootQuery;

module.exports = NewsItem;
