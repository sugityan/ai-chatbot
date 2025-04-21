import { signInAction } from "@/actions/auth/signIn";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/auth-label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex flex-col min-w-64 mx-auto">
      <h1 className="text-2xl font-medium">ログイン</h1>
      <p className="text-sm text-foreground">
        アカウントをお持ちでない方は{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          新規登録
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">メールアドレス</Label>
        <Input name="email" placeholder="example@email.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">パスワード</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            パスワードをお忘れの方
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="パスワードを入力"
          required
        />
        <SubmitButton pendingText="ログイン中..." formAction={signInAction}>
          ログイン
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
