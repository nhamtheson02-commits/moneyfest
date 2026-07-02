import type { NextRequest } from "next/server";
import { finishOAuth } from "@/lib/oauth";

type Params = {
  params: Promise<{ provider: string }>;
};

export async function GET(request: NextRequest, { params }: Params) {
  const { provider } = await params;
  return finishOAuth(request, provider);
}
