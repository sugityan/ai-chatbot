import { resetPasswordAction } from "@/actions/auth/resetPassword";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ResetPasswordPage(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
      <h1 className="text-2xl font-medium">パスワード変更</h1>
      <p className="text-sm text-foreground/60">
        新しいパスワードを入力してください。
      </p>
      <Label htmlFor="password">新しいパスワード</Label>
      <Input
        type="password"
        name="password"
        placeholder="新しいパスワード"
        required
      />
      <Label htmlFor="confirmPassword">パスワード（確認）</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="パスワードを再入力"
        required
      />
      <SubmitButton formAction={resetPasswordAction}>
        パスワードを変更
      </SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
