import type { Metadata } from "next";
import { AdminActionForm } from "@/components/admin-action-form";
import { AdminCard, AdminPageHeader, AdminTableShell, Field, Pagination, SearchFilterBar, TextArea } from "@/components/admin-ui";
import { deleteSettingAction, saveSettingAction } from "@/lib/admin-actions";
import { getAdminSettings } from "@/lib/admin-data";
import { parsePage, parsePageSize, parseSearch } from "@/lib/admin-utils";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminSettingsPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = parseSearch(params.q);
  const page = parsePage(params.page);
  const pageSize = parsePageSize(params.pageSize);
  const data = await getAdminSettings({ q, page, pageSize });
  const query = new URLSearchParams();
  if (q) query.set("q", q);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader title="Settings" description="Quản lý key/value không phải secret. Secret env không được sửa từ UI." />
      <SearchFilterBar q={q} placeholder="Key hoặc group" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <AdminCard title="Tạo setting"><div className="p-4"><SettingForm /></div></AdminCard>
        <AdminCard title="Danh sách setting" description={`${data.meta.total} setting`}>
          <AdminTableShell hasRows={data.items.length > 0} emptyTitle="Chưa có setting" emptyDescription="Tạo setting đầu tiên.">
            <table className="mf-table">
              <thead><tr><th>Key</th><th>Value</th><th>Sửa</th><th>Xóa</th></tr></thead>
              <tbody>
                {data.items.map((setting) => (
                  <tr key={setting.id}>
                    <td><p className="font-bold">{setting.key}</p><p className="mf-muted text-xs">{setting.group}</p></td>
                    <td className="max-w-md whitespace-normal">{setting.value}</td>
                    <td className="min-w-[300px]"><SettingForm setting={setting} /></td>
                    <td>
                      <AdminActionForm action={deleteSettingAction} submitLabel="Xóa" submitVariant="secondary">
                        <input type="hidden" name="id" value={setting.id} />
                      </AdminActionForm>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AdminTableShell>
        </AdminCard>
      </div>
      <Pagination page={data.meta.page} pageCount={data.meta.pageCount} basePath="/admin/settings" query={query} />
    </section>
  );
}

function SettingForm({ setting }: { setting?: { id: string; key: string; value: string; group: string } }) {
  return (
    <AdminActionForm action={saveSettingAction} submitLabel={setting ? "Lưu" : "Tạo"}>
      {setting ? <input type="hidden" name="id" value={setting.id} /> : null}
      <Field label="Key" name="key" defaultValue={setting?.key} required />
      <Field label="Group" name="group" defaultValue={setting?.group ?? "general"} required />
      <TextArea label="Value" name="value" defaultValue={setting?.value} rows={2} required />
    </AdminActionForm>
  );
}
