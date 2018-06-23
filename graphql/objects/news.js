const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');
const axios = require('../../config/axios');

const News = new GraphQLObjectType({
    name: 'News',

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
    type: GraphQLList(News),

    args: {
        page: {
            type: GraphQLString,
            defaultValue: 1,
            description: [
                `The possible values are any integer 1 or larger, or 'all' to reteurn all items.`,
                `Any other values will default to '1'.`,
                `Unless the value passed is 'all', it returns 25 items.`
            ].join('\n')
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

News.rootQuery = rootQuery;

module.exports = News;
