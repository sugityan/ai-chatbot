"use client";

import { signOutAction } from "@/actions/auth/signOut";
import Link from "next/link";
import { Button } from "./ui/button";
import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";

interface HeaderProps {
  user: User | null;
}

export default function HeaderAuth({ user }: HeaderProps) {
  const pathname = usePathname();

  return (
    <div className="ml-auto flex items-center gap-4">
      {user ? (
        <>
          <span className="text-sm">{user.email}</span>
          <Button asChild size="sm" variant="ghost">
            <Link href="/update-password" className="flex items-center gap-1">
              <span>パスワード変更</span>
            </Link>
          </Button>
          <form action={signOutAction}>
            <Button type="submit" variant="outline" size="sm">
              ログアウト
            </Button>
          </form>
        </>
      ) : (
        <div className="flex gap-2">
          <Button
            asChild
            size="sm"
            className={`relative border-none text-black ${
              pathname === "/login"
                ? "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-500"
                : ""
            }`}
          >
            <Link href="/login">ログイン</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className={`relative border-none text-black ${
              pathname === "/sign-up"
                ? "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-500"
                : ""
            }`}
          >
            <Link href="/sign-up">新規登録</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
