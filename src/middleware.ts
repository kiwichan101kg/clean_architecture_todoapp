import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/tasks"],
};

export function middleware(req: NextRequest) {
  // BASIC認証が有効でない場合はスキップする
  if (process.env.ENABLE_BASIC_AUTH !== "true") {
    return NextResponse.next();
  }

  // 環境変数の設定がない場合はスキップする
  if (
    process.env.BASIC_AUTH_USERNAME === undefined ||
    process.env.BASIC_AUTH_PASSWORD === undefined
  ) {
    return NextResponse.next();
  }

  // BASIC認証のチェック
  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [username, password] = Buffer.from(authValue, "base64")
      .toString()
      .split(":");

    if (
      username === process.env.BASIC_AUTH_USERNAME &&
      password === process.env.BASIC_AUTH_PASSWORD
    ) {
      // BASIC認証に成功した場合、アクセスを許可する
      return NextResponse.next();
    }
  }
  // BASIC認証に失敗した場合、エラーを表示する
  return NextResponse.json(
    { error: "Unauthorized" },
    {
      headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
      status: 401,
    }
  );
}
