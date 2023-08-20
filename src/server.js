const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// resolver関数：typeDefsで定義した型に何か値を代入する関数
// https://www.apollographql.com/docs/apollo-server/getting-started#step-5-define-a-resolver
const resolvers = {
  Query: {
    info: () => "HackerNewsクローン",
    feed: () => async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
  },

  Mutation: {
    post: (parent, args, context) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
      return newLink;
    },
  },
};

// ApolloServerのインスタンス生成
// https://www.apollographql.com/docs/apollo-server/getting-started#step-6-create-an-instance-of-apolloserver
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`${url}でサーバーを起動中`));
