This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Supabase プロジェクトの環境構築手順

## 🚀 1. Supabase アカウントの作成

まず、[Supabase](https://supabase.com/) にアクセスし、アカウントを作成してください。GitHub アカウントを使用するか、メールアドレスとパスワードを入力して新規登録できます。

## 🛠️ 2. 新規プロジェクトの作成

ログイン後、ダッシュボードからプロジェクトに参加します

## 📂 3. 環境変数の設定

プロジェクトフォルダ内に `.env.local` というファイルを作成し、以下の内容を追加してください。

```ini
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

⚠ **注意**：

- `YOUR_SUPABASE_URL` と `YOUR_SUPABASE_ANON_KEY` は、Supabaseのダッシュボードにある **「プロジェクト設定」→「API」** から取得できます。

## 🎥 4. 参考動画

Supabase と Next.js を使った環境構築について、以下の動画が参考になります。

[![SupabaseとNext.jsでアプリを構築する方法](https://img.youtube.com/vi/wXXTz2eZIoM/0.jpg)](https://www.youtube.com/watch?v=wXXTz2eZIoM)

---

これで環境構築は完了です！ 🎉
問題が発生した場合は [Supabase 公式ドキュメント](https://supabase.com/docs/) を参考にしてください。

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# ai-chatbot

# ai-chatbot
