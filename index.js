const graphqlHTTP = require('express-graphql');
const app = require('express')();
const config = require('./config');

app.use('/', graphqlHTTP({
    schema: require('./graphql/schema'),
    graphiql: true
}));

module.exports = app;
