import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "rica",
    timestamp: new Date().toISOString(),
  });
}
