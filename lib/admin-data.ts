import type { Prisma } from "@prisma/client";
import { defaultPageSize } from "@/lib/admin-constants";
import { prisma } from "@/lib/prisma";

export type AdminListParams = {
  q?: string;
  status?: string;
  toolType?: string;
  page?: number;
  pageSize?: number;
};

function pagination(params: AdminListParams) {
  const page = params.page && params.page > 0 ? params.page : 1;
  const pageSize = params.pageSize && params.pageSize > 0 ? params.pageSize : defaultPageSize;
  return { page, pageSize, skip: (page - 1) * pageSize, take: pageSize };
}

function paginationMeta(total: number, page: number, pageSize: number) {
  return {
    total,
    page,
    pageSize,
    pageCount: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getAdminDashboardData() {
  const [
    leadCount,
    ebookDownloadCount,
    consultationCount,
    postCount,
    leads,
    downloads,
    consultations,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.ebookDownload.count(),
    prisma.consultationRequest.count(),
    prisma.post.count(),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.ebookDownload.findMany({
      include: { lead: true, ebook: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.consultationRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  return { leadCount, ebookDownloadCount, consultationCount, postCount, leads, downloads, consultations };
}

export async function getAdminLeads(params: AdminListParams) {
  const { page, pageSize, skip, take } = pagination(params);
  const search = params.q?.trim();
  const where: Prisma.LeadWhereInput = {
    ...(params.status ? { status: params.status } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };
  const [items, total] = await Promise.all([
    prisma.lead.findMany({ where, orderBy: { createdAt: "desc" }, skip, take }),
    prisma.lead.count({ where }),
  ]);
  return { items, meta: paginationMeta(total, page, pageSize) };
}

export async function getAdminEbooks(params: AdminListParams) {
  const { page, pageSize, skip, take } = pagination(params);
  const search = params.q?.trim();
  const where: Prisma.EbookWhereInput = search
    ? {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { slug: { contains: search, mode: "insensitive" } },
          { subtitle: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};
  const [items, total] = await Promise.all([
    prisma.ebook.findMany({ where, orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }], skip, take }),
    prisma.ebook.count({ where }),
  ]);
  return { items, meta: paginationMeta(total, page, pageSize) };
}

export async function getAdminPosts(params: AdminListParams) {
  const { page, pageSize, skip, take } = pagination(params);
  const search = params.q?.trim();
  const where: Prisma.PostWhereInput = search
    ? {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { slug: { contains: search, mode: "insensitive" } },
          { excerpt: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};
  const [items, total, categories, tags] = await Promise.all([
    prisma.post.findMany({
      where,
      include: { category: true, tags: true },
      orderBy: { publishedAt: "desc" },
      skip,
      take,
    }),
    prisma.post.count({ where }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
  ]);
  return { items, categories, tags, meta: paginationMeta(total, page, pageSize) };
}

export async function getAdminCategories(params: AdminListParams) {
  const { page, pageSize, skip, take } = pagination(params);
  const search = params.q?.trim();
  const where: Prisma.CategoryWhereInput = search
    ? { OR: [{ name: { contains: search, mode: "insensitive" } }, { slug: { contains: search, mode: "insensitive" } }] }
    : {};
  const [items, total] = await Promise.all([
    prisma.category.findMany({ where, include: { _count: { select: { posts: true } } }, orderBy: { name: "asc" }, skip, take }),
    prisma.category.count({ where }),
  ]);
  return { items, meta: paginationMeta(total, page, pageSize) };
}

export async function getAdminTags(params: AdminListParams) {
  const { page, pageSize, skip, take } = pagination(params);
  const search = params.q?.trim();
  const where: Prisma.TagWhereInput = search
    ? { OR: [{ name: { contains: search, mode: "insensitive" } }, { slug: { contains: search, mode: "insensitive" } }] }
    : {};
  const [items, total] = await Promise.all([
    prisma.tag.findMany({ where, include: { _count: { select: { posts: true } } }, orderBy: { name: "asc" }, skip, take }),
    prisma.tag.count({ where }),
  ]);
  return { items, meta: paginationMeta(total, page, pageSize) };
}

export async function getAdminConsultations(params: AdminListParams) {
  const { page, pageSize, skip, take } = pagination(params);
  const search = params.q?.trim();
  const where: Prisma.ConsultationRequestWhereInput = {
    ...(params.status ? { status: params.status } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
            { financialGoal: { contains: search, mode: "insensitive" } },
            { message: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };
  const [items, total] = await Promise.all([
    prisma.consultationRequest.findMany({ where, orderBy: { createdAt: "desc" }, skip, take }),
    prisma.consultationRequest.count({ where }),
  ]);
  return { items, meta: paginationMeta(total, page, pageSize) };
}

export async function getAdminToolResults(params: AdminListParams) {
  const { page, pageSize, skip, take } = pagination(params);
  const where: Prisma.ToolResultWhereInput = {
    ...(params.toolType ? { toolType: params.toolType } : {}),
    ...(params.q
      ? {
          OR: [
            { email: { contains: params.q, mode: "insensitive" } },
            { result: { contains: params.q, mode: "insensitive" } },
          ],
        }
      : {}),
  };
  const [items, total, toolTypes] = await Promise.all([
    prisma.toolResult.findMany({ where, include: { lead: true }, orderBy: { createdAt: "desc" }, skip, take }),
    prisma.toolResult.count({ where }),
    prisma.toolResult.findMany({ distinct: ["toolType"], select: { toolType: true }, orderBy: { toolType: "asc" } }),
  ]);
  return { items, toolTypes: toolTypes.map((item) => item.toolType), meta: paginationMeta(total, page, pageSize) };
}

export async function getAdminSettings(params: AdminListParams) {
  const { page, pageSize, skip, take } = pagination(params);
  const search = params.q?.trim();
  const where: Prisma.SettingWhereInput = search
    ? { OR: [{ key: { contains: search, mode: "insensitive" } }, { group: { contains: search, mode: "insensitive" } }] }
    : {};
  const [items, total] = await Promise.all([
    prisma.setting.findMany({ where, orderBy: [{ group: "asc" }, { key: "asc" }], skip, take }),
    prisma.setting.count({ where }),
  ]);
  return { items, meta: paginationMeta(total, page, pageSize) };
}
