"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";

export const updatePasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/update-password",
      "パスワードと確認用パスワードを入力してください"
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      "error",
      "/update-password",
      "パスワードが一致しません"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return encodedRedirect("error", "/update-password", `${error.message}`);
  }

  return encodedRedirect(
    "success",
    "/update-password",
    "パスワードが正常に更新されました"
  );
};
