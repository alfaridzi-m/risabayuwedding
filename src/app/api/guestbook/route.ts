import { NextResponse } from "next/server";

const GUESTBOOK_URL =
  "https://script.google.com/macros/s/AKfycbyT_NhAYqzpP8Jiu4OE1aSKDbu1GIrtmsQdLn-hrhFLnO67IJWt0z9rSJxj2cmfGFMJ/exec";

export async function GET() {
  try {
    const response = await fetch(GUESTBOOK_URL, { cache: "no-store" });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ error: "Gagal memuat ucapan" }, { status: 502 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(GUESTBOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ error: "Gagal mengirim ucapan" }, { status: 502 });
  }
}
