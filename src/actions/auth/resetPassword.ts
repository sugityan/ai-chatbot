'use server';

import { encodedRedirect } from '@/utils/utils';
import { createClient } from '@/utils/supabase/server';

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || !confirmPassword) {
    encodedRedirect('error', '/reset-password', 'パスワードと確認用パスワードを入力してください');
  }

  if (password !== confirmPassword) {
    return encodedRedirect('error', '/reset-password', 'パスワードが一致しません');
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return encodedRedirect(
      'error',
      '/reset-password',
      `${error.message}`
      // "パスワードの更新に失敗しました"
    );
  }

  return encodedRedirect('success', '/reset-password', 'パスワードが正常に更新されました');
};
