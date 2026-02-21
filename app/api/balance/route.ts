import { NextResponse } from "next/server";

const API_TOKEN = "c4c741c49f069eff3bc6aabd2d1912f19b7524e46d53b0ac62ec0acfee0d";

export async function GET() {
  try {
    const resp = await fetch("https://resi-api.iproyal.com/v1/me", {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!resp.ok) {
      return NextResponse.json(
        { error: `Request failed with status ${resp.status}` },
        { status: resp.status }
      );
    }

    const data = await resp.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Balance API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch balance" },
      { status: 500 }
    );
  }
}
