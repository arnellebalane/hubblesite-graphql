const graphqlHTTP = require('express-graphql');
const app = require('express')();
const config = require('./config');

app.use('/', graphqlHTTP({
    schema: require('./graphql/schema'),
    graphiql: true
}));

app.listen(config.app.port, () => {
    console.log(`Server is now listening on port ${config.app.port}`);
});
