import type { NextRequest } from "next/server";
import { startOAuth } from "@/lib/oauth";

type Params = {
  params: Promise<{ provider: string }>;
};

export async function GET(request: NextRequest, { params }: Params) {
  const { provider } = await params;
  return startOAuth(request, provider);
}
