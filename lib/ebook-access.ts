import "server-only";

import type { Ebook } from "@prisma/client";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireUser, type CurrentUser } from "@/lib/auth";

export type EbookAccessState = {
  user: CurrentUser | null;
  canAccess: boolean;
  reason: string;
};

const accountRank: Record<string, number> = {
  FREE: 1,
  PAID: 2,
  MEMBER: 3,
  ADMIN: 4,
};

function normalized(value: string | null | undefined) {
  return (value || "FREE").toUpperCase();
}

export function canAccountAccessLevel(accountType: string, accessLevel: string) {
  const account = normalized(accountType);
  const level = normalized(accessLevel);
  if (account === "ADMIN") return true;
  if (level === "FREE") return true;
  if (level === "PAID") return accountRank[account] >= accountRank.PAID;
  if (level === "MEMBERSHIP") return accountRank[account] >= accountRank.MEMBER;
  return false;
}

export async function getEbookAccessState(ebook: Pick<Ebook, "id" | "accessLevel" | "isFree">) {
  const user = await getCurrentUser();
  if (!user) {
    return {
      user: null,
      canAccess: false,
      reason: ebook.isFree || normalized(ebook.accessLevel) === "FREE"
        ? "Đăng nhập để tải ebook miễn phí."
        : "Đăng nhập để kiểm tra quyền truy cập ebook này.",
    };
  }

  if (canAccountAccessLevel(user.accountType, ebook.accessLevel)) {
    return { user, canAccess: true, reason: "Tài khoản của bạn có quyền truy cập ebook này." };
  }

  const grant = await prisma.ebookAccess.findUnique({
    where: { userId_ebookId: { userId: user.id, ebookId: ebook.id } },
  });
  if (grant && (!grant.expiresAt || grant.expiresAt >= new Date())) {
    return { user, canAccess: true, reason: `Bạn đã được cấp quyền ${grant.accessType}.` };
  }

  return {
    user,
    canAccess: false,
    reason: "Tài khoản hiện tại chưa có quyền truy cập ebook này.",
  };
}

export type EbookDownloadActionState = {
  ok: boolean;
  message: string;
  downloadUrl?: string | null;
};

export async function requireEbookAccess(slug: string) {
  const user = await requireUser(`/ebooks/${slug}`);
  const ebook = await prisma.ebook.findUnique({ where: { slug } });
  if (!ebook) redirect("/ebooks");
  const access = await getEbookAccessState(ebook);
  if (!access.canAccess) redirect(`/ebooks/${slug}`);
  return { user, ebook };
}
