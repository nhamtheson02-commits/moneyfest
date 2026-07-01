import "server-only";

const BREVO_API_URL = "https://api.brevo.com/v3";

type LeadAutomationInput = {
  name: string;
  email: string;
  phone?: string;
  source: "ebook_download" | "consultation";
  ebookTitle?: string;
  downloadUrl?: string | null;
  financialGoal?: string;
  message?: string;
};

type BrevoRequestOptions = {
  method?: "POST" | "PUT";
  body: Record<string, unknown>;
};

function getConfig() {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const senderEmail = process.env.BREVO_SENDER_EMAIL?.trim();
  const senderName = process.env.BREVO_SENDER_NAME?.trim() || "MONEYFEST";
  const ownerEmail = process.env.BREVO_OWNER_EMAIL?.trim();
  const listId = Number(process.env.BREVO_LIST_ID);

  return {
    apiKey,
    senderEmail,
    senderName,
    ownerEmail,
    listId: Number.isInteger(listId) && listId > 0 ? listId : undefined,
  };
}

async function brevoRequest(path: string, options: BrevoRequestOptions) {
  const { apiKey } = getConfig();
  if (!apiKey) return null;

  const response = await fetch(`${BREVO_API_URL}${path}`, {
    method: options.method ?? "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(options.body),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Brevo ${path} failed (${response.status}): ${detail.slice(0, 300)}`);
  }

  if (response.status === 204) return null;
  return response.json() as Promise<unknown>;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function upsertContact(input: LeadAutomationInput) {
  const { listId } = getConfig();
  const attributes: Record<string, string> = {
    FIRSTNAME: input.name,
    SOURCE: input.source,
  };

  if (input.phone) attributes.SMS = input.phone;

  return brevoRequest("/contacts", {
    body: {
      email: input.email,
      attributes,
      ...(listId ? { listIds: [listId] } : {}),
      updateEnabled: true,
    },
  });
}

async function sendEmail(options: {
  to: Array<{ email: string; name?: string }>;
  subject: string;
  htmlContent: string;
  tags: string[];
}) {
  const { senderEmail, senderName } = getConfig();
  if (!senderEmail) return null;

  return brevoRequest("/smtp/email", {
    body: {
      sender: { email: senderEmail, name: senderName },
      to: options.to,
      subject: options.subject,
      htmlContent: options.htmlContent,
      tags: options.tags,
      replyTo: { email: senderEmail, name: senderName },
    },
  });
}

function emailFrame(content: string) {
  return `
    <!doctype html>
    <html lang="vi">
      <body style="margin:0;background:#f4f0e8;font-family:Arial,sans-serif;color:#172033">
        <div style="max-width:620px;margin:0 auto;padding:32px 20px">
          <div style="background:#080b12;border-radius:16px;padding:28px;color:#f4f0e8">
            <div style="color:#d4a83f;font-size:13px;font-weight:700;letter-spacing:.12em">MONEYFEST</div>
            ${content}
          </div>
          <p style="font-size:12px;line-height:1.6;color:#687083">
            Email này được gửi vì bạn vừa thực hiện yêu cầu trên website MONEYFEST.
          </p>
        </div>
      </body>
    </html>
  `;
}

async function sendLeadEmails(input: LeadAutomationInput) {
  const safeName = escapeHtml(input.name);

  if (input.source === "ebook_download") {
    const safeTitle = escapeHtml(input.ebookTitle || "tài liệu MONEYFEST");
    const downloadButton = input.downloadUrl
      ? `<p style="margin:24px 0"><a href="${escapeHtml(input.downloadUrl)}" style="display:inline-block;background:#d4a83f;color:#080b12;padding:13px 20px;border-radius:8px;text-decoration:none;font-weight:700">Tải ebook</a></p>`
      : "<p>Tài liệu đang được hoàn thiện. MONEYFEST sẽ gửi đường dẫn tải ngay khi sẵn sàng.</p>";

    await sendEmail({
      to: [{ email: input.email, name: input.name }],
      subject: `Ebook của bạn: ${input.ebookTitle || "MONEYFEST"}`,
      tags: ["moneyfest", "ebook-download"],
      htmlContent: emailFrame(`
        <h1 style="font-size:28px;line-height:1.25;margin:18px 0">Chào ${safeName},</h1>
        <p style="line-height:1.7">Cảm ơn bạn đã đăng ký nhận <strong>${safeTitle}</strong>.</p>
        ${downloadButton}
        <p style="line-height:1.7">Chúc bạn có một bước tiếp theo thật rõ ràng với tài chính của mình.</p>
      `),
    });
    return;
  }

  await sendEmail({
    to: [{ email: input.email, name: input.name }],
    subject: "MONEYFEST đã nhận yêu cầu tư vấn của bạn",
    tags: ["moneyfest", "consultation"],
    htmlContent: emailFrame(`
      <h1 style="font-size:28px;line-height:1.25;margin:18px 0">Chào ${safeName},</h1>
      <p style="line-height:1.7">MONEYFEST đã nhận yêu cầu tư vấn của bạn${
        input.financialGoal
          ? ` về <strong>${escapeHtml(input.financialGoal)}</strong>`
          : ""
      }.</p>
      <p style="line-height:1.7">Đội ngũ sẽ xem thông tin và liên hệ để thống nhất thời gian phù hợp.</p>
    `),
  });

  const { ownerEmail } = getConfig();
  if (ownerEmail) {
    await sendEmail({
      to: [{ email: ownerEmail, name: "MONEYFEST Team" }],
      subject: `Lead tư vấn mới: ${input.name}`,
      tags: ["moneyfest", "new-lead"],
      htmlContent: emailFrame(`
        <h1 style="font-size:26px;margin:18px 0">Lead tư vấn mới</h1>
        <p><strong>Họ tên:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
        <p><strong>Điện thoại:</strong> ${escapeHtml(input.phone || "Không có")}</p>
        <p><strong>Mục tiêu:</strong> ${escapeHtml(input.financialGoal || "Không có")}</p>
        <p><strong>Nhu cầu:</strong> ${escapeHtml(input.message || "Không có")}</p>
      `),
    });
  }
}

export async function runLeadAutomation(input: LeadAutomationInput) {
  const { apiKey } = getConfig();
  if (!apiKey) return { configured: false, ok: true };

  try {
    await upsertContact(input);
    await sendLeadEmails(input);
    return { configured: true, ok: true };
  } catch (error) {
    console.error("Lead automation failed", error);
    return { configured: true, ok: false };
  }
}
