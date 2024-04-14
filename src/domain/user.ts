import { randomUUID } from "crypto";

type Role = "Admin" | "Member";
export class User {
  public id: string;
  public username: string;
  public passwordHash: string;
  public role: Role;

  constructor(username: string, password: string, role: Role = "Member") {
    if (!this.isValidPassword(password)) {
      throw new Error(
        "Password must be at least 8 characters long and include alphanumeric characters."
      );
    }

    if (!username) {
      throw new Error("Username is required and cannot be empty.");
    }

    this.id = randomUUID();
    this.username = username;
    this.passwordHash = this.hashPassword(password);
    this.role = role;
  }

  // 名前更新メソッド
  public setUsername(newUsername: string): void {
    if (!newUsername) {
      throw new Error("Username is required and cannot be empty.");
    }
    this.username = newUsername;
  }

  // パスワードは8文字以上の英数字
  private isValidPassword(password: string): boolean {
    return (
      password.length >= 8 &&
      /[a-zA-Z]/.test(password) &&
      /[0-9]/.test(password)
    );
  }

  // パスワードのハッシュ化
  private hashPassword(password: string): string {
    // 本来はbcryptなどのセキュアなハッシュ関数を使用すべきですが、ここでは単純化
    return password; // ダミーの実装
  }

  // パスワードチェック
  public verifyPassword(inputPassword: string): boolean {
    // 実際の実装では、ハッシュ化されたパスワードと比較するためにbcryptなどを使用
    return this.passwordHash === inputPassword;
  }

  // 管理者かどうかを確認
  public isAdmin(): boolean {
    return this.role === "Admin";
  }

  // コンテンツを編集できるかどうかを確認
  public canEditContent(): boolean {
    return this.role === "Admin"; // 現時点では管理者のみ編集可能と設定
  }
}
