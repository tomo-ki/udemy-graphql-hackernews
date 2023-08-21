const jwt = require("jsonwebtoken");
APP_SECRET = "Graphql";

// トークンを複合するための関数
function getTokenPayload(token) {
  // トークン化された物の前の情報(user.id)を複合する
  return jwt.verify(token, APP_SECRET);
}

// ユーザIDを取得するための関数
function getUserId(req, authToken) {
  if (req) {
    // ヘッダーを確認します。認証権限がありますか？を確認する
    const authHeader = req.headers.authorization;
    // 権限があるなら
    if (authHeader) {
      const token = authHeader.replace("Bearer", "");
      if (!token) {
        throw new Error("トークンが見つかりませんでした");
      }
      // そのトークンを複合する
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error("認証情報がありません");
}

module.exports = {
  APP_SECRET,
};
