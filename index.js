const graphqlHTTP = require('express-graphql');
const app = require('express')();

app.use('/', graphqlHTTP({
    graphiql: true
}));

app.listen(5000, () => {
    console.log('Server is now listening on port 5000');
});
