const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

APP_SECRET = "Graphql";

// ユーザの新規作成のresolver
async function signup(parent, args, context) {
  // パスワードの設定
  const password = await bcrypt.hash(args.password, 10);

  // ユーザの新規作成
  const user = await context.prisma.user.create({
    data: {
      ...args,
      password,
    },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}
