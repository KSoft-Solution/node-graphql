const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { join } = require("path");
const { loadSchemaSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { addResolversToSchema } = require("@graphql-tools/schema");
const envs = require("./envs");

const Query = require("./schema/query");
const Mutation = require("./schema/mutation");

const app = express();
app.use(express.json());

const schema = loadSchemaSync(join(__dirname, "./GRAPHQL/schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const resolvers = {
  Query,
  Mutation,
};

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers: resolvers,
});

app.use(
  envs.graphqlPath,
  graphqlHTTP((request, response, graphQLParams) => ({
    schema: schemaWithResolvers,
    rootValue: resolvers,
    graphiql: true,
    context: {
      request,
      response,
      graphQLParams
    },
  }))
);

app.listen(envs.port, () => {
  console.log(
    `Server is running at http://localhost:${envs.port} ${envs.graphqlPath}`
  );
});
