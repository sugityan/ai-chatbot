'use server';

import { createClient } from '@/utils/supabase/server';
import { encodedRedirect } from '@/utils/utils';
import { getURL } from '@/utils/supabase/url';

export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const role = formData.get('role')?.toString();
  const supabase = await createClient();

  if (!email || !password) {
    return encodedRedirect('error', '/sign-up', 'Email and password are required');
  }

  // Email上のURL先を設定
  // ローカル環境ではlocalhost:3000を使用
  // 本番環境ではgetURL()を使用
  // Vercel上にの環境変数では、NEXT_PUBLIC_VERCEL_URL又は、NEXT_PUBLIC_SITE_URLを設定
  // 参考：https://supabase.com/docs/guides/auth/redirect-urls

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role },
      emailRedirectTo: `${getURL()}`,
    },
  });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return encodedRedirect('error', '/sign-up', error.message);
  }

  return encodedRedirect(
    'success',
    '/sign-up',
    'Thanks for signing up! Please check your email for a verification link.'
  );
};
