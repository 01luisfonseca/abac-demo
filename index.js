var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var fs = require('fs');
var path = require('path')
var gqlSchema = fs.readFileSync(path.join(__dirname, 'schema.gql'), 'utf8')
var _ = require('lodash')

// Construct a schema, using GraphQL schema language
var schema = buildSchema(gqlSchema);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');