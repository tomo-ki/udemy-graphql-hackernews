const { ApolloServer, gql } = require("apollo-server");

// GraphQLスキーマ(データ構造)の定義
const typeDefs = gql`
  type Query {
    info: String!
  }
`;

// resolver関数：typeDefsで定義した型に何か値を代入する関数
const resolvers = {
  Query: {
    info: () => "HackerNewsクローン",
  },
};
