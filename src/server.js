const { ApolloServer, gql } = require("apollo-server");

// GraphQLスキーマ(データ構造)の定義
// https://www.apollographql.com/docs/apollo-server/getting-started#step-3-define-your-graphql-schema
const typeDefs = gql`
  type Query {
    info: String!
  }
`;

// resolver関数：typeDefsで定義した型に何か値を代入する関数
// https://www.apollographql.com/docs/apollo-server/getting-started#step-5-define-a-resolver
const resolvers = {
  Query: {
    info: () => "HackerNewsクローン",
  },
};

// ApolloServerのインスタンス生成
// https://www.apollographql.com/docs/apollo-server/getting-started#step-6-create-an-instance-of-apolloserver
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`${url}でサーバーを起動中`));
