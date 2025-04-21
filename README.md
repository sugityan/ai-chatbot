# AI Chatbot

最新のテクノロジーを活用したAIチャットボットアプリケーション

## 特徴

### 最新のNext.js機能

- Next.js 15 App Routerを採用
- React Server Components (RSCs)とServer Actionsによる高パフォーマンスな実装
- TypeScriptによる型安全な開発環境

### AIとの対話機能

- OpenAI SDKを活用した自然な対話機能
- マルチモーダル入力対応（テキスト、画像、コード等）
- コードの編集や実行機能
- PDFやスプレッドシートなど多様なドキュメント形式のサポート

### モダンなUI/UX

- Tailwind CSSによるスタイリング
- Radix UIベースのアクセシブルなコンポーネント
- ダークモード対応
- レスポンシブデザイン

### データ永続化と認証

- Supabaseによるデータベース管理
- 堅牢な認証システム
  - ログイン/サインアップ
  - パスワードリセット
  - セッション管理

## 技術スタック

- **フロントエンド**

  - React 19
  - Next.js 15
  - Tailwind CSS
  - Framer Motion
  - CodeMirror（コードエディタ）

- **バックエンド**

  - Supabase
  - OpenAI SDK
  - drizzle-orm（データベースORM）

- **開発ツール**
  - TypeScript
  - ESLint
  - Prettier

## ローカル環境での実行方法

1. 依存パッケージのインストール

```bash
npm install
```

2. 環境変数の設定

- `.env.example`を`.env`にコピーし、必要な環境変数を設定
  - Supabase認証情報
  - OpenAI API キー

3. 開発サーバーの起動

```bash
npm run dev
```

アプリケーションは http://localhost:3000 で起動します。

## スクリプト

- `npm run dev` - 開発サーバーの起動（Turbopack使用）
- `npm run build` - プロダクションビルド
- `npm run start` - プロダクションサーバーの起動
- `npm run lint` - ESLintによるコード検証
- `npm run format` - Prettierによるコードフォーマット
